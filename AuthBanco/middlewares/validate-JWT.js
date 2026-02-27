'use strict';

import { verifyJWT } from '../helpers/generate.jwt.js';
import { User } from '../src/users/user.model.js';
import { Role } from '../src/auth/role.model.js';



export const validateJWT = async (req, res, next) => {
  try {
    let token =
      req.header('x-token') ||
      req.header('authorization') ||
      req.body.token ||
      req.query.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No hay token en la petición',
      });
    }

    // Quitar Bearer
    token = token.replace(/^Bearer\s+/, '');

    // Verificar token
    const decoded = await verifyJWT(token);

    // Buscar usuario en DB
    const user = await User.findByPk(decoded.sub, {
      include: {
        model: Role,
        as: 'role',
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no existe',
      });
    }

    // Verificar activo
    if (!user.Status) {
      return res.status(423).json({
        success: false,
        message: 'Cuenta desactivada',
      });
    }

    // Guardar usuario en request
    req.user = user;
    req.userId = user.Id;
    req.role = user.role.Name;

    next();
  } catch (error) {
    console.error('JWT Error:', error);

    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: process.env.NODE_ENV === 'development'
        ? error.message
        : undefined,
    });
  }
};
