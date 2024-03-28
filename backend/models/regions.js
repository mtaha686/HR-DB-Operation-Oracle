const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Region = sequelize.define(
  "Region",
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

module.exports = Region;
