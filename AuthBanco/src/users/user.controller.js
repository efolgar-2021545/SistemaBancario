'use strict';

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

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
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
