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
    },

    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    DPI: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    Address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    Phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
