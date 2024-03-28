const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Country = sequelize.define(
  "COUNTRIES",
  {
    COUNTRY_ID: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
    },
    COUNTRY_NAME: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    REGION_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Region", // Assuming you have a model named Region for the regions table
        key: "REGION_ID",
      },
    },
  },
  {
    tableName: "COUNTRIES", // Specify the actual table name if it differs
    timestamps: false, // Set to true if your table has createdAt and updatedAt columns
  }
);

module.exports = Country;
