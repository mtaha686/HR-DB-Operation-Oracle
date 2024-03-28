const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
  DEPARTMENT_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  DEPARTMENT_NAME: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  MANAGER_ID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  LOCATION_ID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'DEPARTMENTS',
  timestamps: false
});

module.exports = Department;
