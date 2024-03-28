const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Location = sequelize.define(
  "Location",
  {
    LOCATION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    STREET_ADDRESS: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    POSTAL_CODE: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    CITY: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    STATE_PROVINCE: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    COUNTRY_ID: {
      type: DataTypes.CHAR(2),
      allowNull: true,
    },
  },
  {
    tableName: "LOCATIONS",
    timestamps: false,
  }
);

module.exports = Location;
