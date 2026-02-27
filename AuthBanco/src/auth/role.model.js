'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';

export const Role = sequelize.define(
  'Role',
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'roles',
  }
);
