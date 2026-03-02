'use strict';
import argon2 from 'argon2';
import { User } from './user.model.js';
import { Role } from '../auth/role.model.js';




// Ver usuarios pendientes (solo admin)
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { Status: false },
      attributes: {
        exclude: ['Password'],
      },
      include: {
        model: Role,
        as: 'role',
      },
    });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios pendientes',
    });
  }
};




// Aprobar usuario
export const approveUser = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findByPk(userId, {
      include: { model: Role, as: 'role' }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    if (user.role.Name === 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'No puedes modificar a otro administrador',
      });
    }

    const roleDb = await Role.findOne({
      where: { Name: role },
    });

    if (!roleDb) {
      return res.status(400).json({
        success: false,
        message: 'Rol inválido',
      });
    }

    user.RoleId = roleDb.Id;
    user.Status = true;

    await user.save();

    return res.json({
      success: true,
      message: 'Usuario aprobado correctamente',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error al aprobar usuario',
    });
  }
};


// actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      Name,
      Username,
      Email,
      Password,
      DPI,
      Address,
      Phone,
      Job,
      MonthlyIncome
    } = req.body;

    const user = await User.findByPk(userId, {
      include: { model: Role, as: 'role' },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    if (user.role.Name === 'ADMIN' && user.Id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No puedes modificar a otro administrador' });
    }

    let hashedPassword = user.Password;
    if (Password) hashedPassword = await argon2.hash(Password);

    await user.update({
      Name: Name ?? user.Name,
      Username: Username ?? user.Username,
      Email: Email ?? user.Email,
      Password: hashedPassword,
      DPI: DPI ?? user.DPI,
      Address: Address ?? user.Address,
      Phone: Phone ?? user.Phone,
      Job: Job ?? user.Job,
      MonthlyIncome: MonthlyIncome ?? user.MonthlyIncome,
    });

    return res.json({
      success: true,
      message: 'Usuario actualizado correctamente',
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al actualizar usuario' });
  }
};