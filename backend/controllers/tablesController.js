const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const getTableNames = async (req, res) => {
  try {
    const tableExists = await sequelize.queryInterface.showAllTables();
    const tableNames = tableExists.map((table) => table.tableName);

    const specifiedTables = [
      "REGIONS",
      "COUNTRIES",
      "LOCATIONS",
      "DEPARTMENTS",
      "JOBS",
      "EMPLOYEES",
      "JOB_HISTORY",
      "students",
    ];

    // Filter table names to include only the specified tables
    const filteredTableNames = tableNames.filter((tableName) =>
      specifiedTables.includes(tableName)
    );

    return res.status(200).json(filteredTableNames);
  } catch (error) {
    console.error("Error retrieving table names:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTableNames,
};
