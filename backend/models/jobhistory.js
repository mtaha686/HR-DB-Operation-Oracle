const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JOB_HISTORY = sequelize.define(
  "JOB_HISTORY",
  {
    EMPLOYEE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    START_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
    END_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    JOB_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    DEPARTMENT_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "JOB_HISTORY",
    timestamps: false,
  }
);

module.exports = JOB_HISTORY;
