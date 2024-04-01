const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const REGIONS = sequelize.define(
  "REGIONS",
  {
    REGION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    REGION_NAME: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
  },
  {
    tableName: "REGIONS",
    timestamps: false,
  }
);

module.exports = REGIONS;
