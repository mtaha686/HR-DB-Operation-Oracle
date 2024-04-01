const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EMPLOYEES = sequelize.define(
  "DEPARTMENTS",
  {
    EMPLOYEE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    FIRST_NAME: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    LAST_NAME: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    EMAIL: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    PHONE_NUMBER: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    HIRE_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    JOB_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    SALARY: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    COMMISSION_PCT: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    MANAGER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DEPARTMENT_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "EMPLOYEES",
    timestamps: false,
  }
);

module.exports = EMPLOYEES;
