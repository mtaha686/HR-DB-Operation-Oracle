const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DEPARTMENTS = sequelize.define(
  "DEPARTMENTS",
  {
    DEPARTMENT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    DEPARTMENT_NAME: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    MANAGER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LOCATION_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "DEPARTMENTS",
    timestamps: false,
  }
);

module.exports = DEPARTMENTS;
