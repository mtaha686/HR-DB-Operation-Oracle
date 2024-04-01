const sequelize = require("../config/db");
const JOB_HISTORY = require("../models/jobhistory");
const JOBS = require("../models/jobs");
const COUNTRIES = require("../models/countries");
const DEPARTMENTS = require("../models/departments");
const EMPLOYEES = require("../models/employees");
const LOCATIONS = require("../models/locations");
const REGIONS = require("../models/regions");
const students = require("../models/students");
const { parseCSVData, parseExcelData } = require("./utils");
const { disableForeignKeys, enableForeignKeys } = require("./utils"); // Importing the functions

async function uploadData(req, res) {
  const file = req.file;
  const { tableName, truncate } = req.body;
  const tableExists = await sequelize.queryInterface.showAllTables();
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }
    let parsedData = [];
    if (file.originalname.endsWith(".csv")) {
      parsedData = await parseCSVData(file.path);
    } else if (
      file.originalname.endsWith(".xlsx") ||
      file.originalname.endsWith(".xls")
    ) {
      parsedData = await parseExcelData(file.path);
    } else {
      throw new Error("Unsupported file format");
    }
    // Check if the table name exists in the database schema
    const tableModel = sequelize.models[tableName];
    if (!tableModel) {
      return res.status(400).json({ error: "Invalid table name" });
    }
    // If truncate is true, delete all records from the table
    if (truncate) {
      await tableModel.destroy({ truncate: true });
    }

    console.log(parsedData);
    // Disable foreign key constraints before bulk inserting data
    // await disableForeignKeys();

    // Insert data into the respective table based on tableName
    switch (tableName) {
      case "JOB_HISTORY":
        await JOB_HISTORY.bulkCreate(parsedData);
        break;
      case "JOBS":
        await JOBS.bulkCreate(parsedData);
        break;
      case "COUNTRIES":
        await COUNTRIES.bulkCreate(parsedData);
        break;
      case "DEPARTMENTS":
        await DEPARTMENTS.bulkCreate(parsedData);
        break;
      case "EMPLOYEES":
        await EMPLOYEES.bulkCreate(parsedData);
        break;
      case "LOCATIONS":
        await LOCATIONS.bulkCreate(parsedData);
        break;
      case "REGIONS":
        await REGIONS.bulkCreate(parsedData);
        break;
      case "students":
        await students.bulkCreate(parsedData);
        break;
      default:
        throw new Error("Invalid table name");
    }

    // Enable foreign key constraints after bulk inserting data
    // await enableForeignKeys();

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadData };
