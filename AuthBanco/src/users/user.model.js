'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';
import { Role } from '../auth/role.model.js';

export const User = sequelize.define(
  'User',
  {
    Id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },

    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    Username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    Email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      maxlength:[100, 'El correo no puede exceder de 100 carácteres ']
    },

    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      minlength:[8, 'La contraseña debe ser mayor a 8 caracteres']
    },

    DPI: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      minlength: [13, 'El DPI no puede tener menos de 13 dígitos'],
      maxlength: [13, 'El DPI no puede tener mas de 13 dígitos'],
      match: [/^\d{13}$/, 'El DPI solo debe contener números']
    },

    Address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    Phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique:true,
      minlength: [8, 'El número de teléfono no puede tener menos de 8 dígitos'],
      maxlength: [8, 'El número de teléfono no puede tener mas de 8 dígitos'],
      match: [/^\d{8}$/, 'El teléfono solo debe contener números'],
    },

    Job: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    MonthlyIncome: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 100,
      },
    },

    AccountNumber: {
      type: DataTypes.STRING(20),
      unique: true,
    },

    Status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // false = pendiente
    },
  },
  {
    tableName: 'users',
  }
);



// Relación: Usuario -> Rol
User.belongsTo(Role, {
  foreignKey: 'RoleId',
  as: 'role',
});
