const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const students = sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    semester: {
      type: DataTypes.STRING(255),
    },
    degree: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = students;
