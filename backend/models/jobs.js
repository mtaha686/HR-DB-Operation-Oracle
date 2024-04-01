const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JOBS = sequelize.define(
  "JOBS",
  {
    JOB_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    JOB_TITLE: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    MIN_SALARY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MAX_SALARY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "JOBS",
    timestamps: false,
  }
);

module.exports = JOBS;
