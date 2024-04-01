// utils.js
const csv = require("csv-parser");
const excel = require("exceljs");
const fs = require("fs");

const parseCSVData = (filePath) => {
  return new Promise((resolve, reject) => {
    const parsedData = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        parsedData.push(row);
      })
      .on("end", () => {
        resolve(parsedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const parseExcelData = (filePath) => {
  return new Promise((resolve, reject) => {
    const parsedData = [];
    const workbook = new excel.Workbook();
    workbook.xlsx
      .readFile(filePath)
      .then(() => {
        const worksheet = workbook.worksheets[0];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            const rowData = {};
            row.eachCell((cell, colNumber) => {
              rowData[`column${colNumber}`] = cell.value;
            });
            parsedData.push(rowData);
          }
        });
        resolve(parsedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sequelize = require("../config/db");

async function disableForeignKeys() {
  try {
    const tables = [
      "REGIONS",
      "COUNTRIES",
      "LOCATIONS",
      "DEPARTMENTS",
      "JOBS",
      "EMPLOYEES",
      "JOB_HISTORY",
    ];
    for (const table of tables) {
      await sequelize.query(`ALTER TABLE ${table} DISABLE ALL CONSTRAINTS`);
    }
    console.log("Foreign key constraints disabled.");
  } catch (error) {
    console.error("Error disabling foreign key constraints:", error);
  }
}

async function enableForeignKeys() {
  try {
    const tables = [
      "REGIONS",
      "COUNTRIES",
      "LOCATIONS",
      "DEPARTMENTS",
      "JOBS",
      "EMPLOYEES",
      "JOB_HISTORY",
    ];
    for (const table of tables) {
      await sequelize.query(`ALTER TABLE ${table} ENABLE ALL CONSTRAINTS`);
    }
    console.log("Foreign key constraints enabled.");
  } catch (error) {
    console.error("Error enabling foreign key constraints:", error);
  }
}

// Usage:
// Call disableForeignKeys() before performing operations and enableForeignKeys() afterward.

// module.exports = {};

module.exports = {
  parseCSVData,
  parseExcelData,
  disableForeignKeys,
  enableForeignKeys,
};
