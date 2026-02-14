'use strict';

import argon2 from 'argon2';
import { User } from '../users/user.model.js';
import { Role } from './role.model.js';
import { generateJWT } from '../../helpers/generate.jwt.js';
import { generateUserId } from '../../helpers/uuid.generator.js';




// REGISTRO (queda pendiente hasta que admin apruebe)
export const register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      dpi,
      address,
      phone,
      job,
      monthlyIncome,
    } = req.body;

    // Validar ingresos
    if (monthlyIncome < 100) {
      return res.status(400).json({
        success: false,
        message: 'Ingresos mínimos Q100 requeridos',
      });
    }

    // Verificar duplicados
    const exists = await User.findOne({
      where: { Email: email },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Correo ya registrado',
      });
    }

    // Buscar rol CLIENT
    const clientRole = await Role.findOne({
      where: { Name: 'CLIENT' },
    });

    // Encriptar password
    const hash = await argon2.hash(password);

    // Generar número de cuenta
    const accountNumber = `ACC-${Date.now()}`;

    // Crear usuario
    const user = await User.create({
      Id: generateUserId(),
      Name: name,
      Username: username,
      Email: email,
      Password: hash,
      DPI: dpi,
      Address: address,
      Phone: phone,
      Job: job,
      MonthlyIncome: monthlyIncome,
      AccountNumber: accountNumber,
      RoleId: clientRole.Id,
      Status: false, // pendiente
    });

    return res.status(201).json({
      success: true,
      message: 'Registro exitoso. Espera aprobación del administrador.',
      userId: user.Id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Error en registro',
    });
  }
};




// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario con rol
    const user = await User.findOne({
      where: { Email: email },
      include: {
        model: Role,
        as: 'role',
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Verificar aprobado
    if (!user.Status) {
      return res.status(403).json({
        success: false,
        message: 'Cuenta pendiente de aprobación',
      });
    }

    // Verificar password
    const valid = await argon2.verify(user.Password, password);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Generar token
    const token = await generateJWT(user.Id, {
      role: user.role.Name,
      email: user.Email,
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user.Id,
        name: user.Name,
        role: user.role.Name,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Error en login',
    });
  }
};
