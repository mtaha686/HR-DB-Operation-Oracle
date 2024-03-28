const sequelize = require("../config/db");
const { parseCSVData, parseExcelData } = require("./utils");

const insertData = async (req, res) => {
  const { tableName } = req.body;
  const file = req.files.file;

  try {
    // Check if the table name exists in the database schema
    // Assuming sequelize models are already defined for each table
    const tableModel = sequelize.models[tableName];
    if (!tableModel) {
      return res.status(400).json({ error: "Invalid table name" });
    }

    // Parse the file based on its type
    let parsedData;
    if (file.mimetype === "text/csv") {
      parsedData = await parseCSVData(file.data);
    } else if (file.mimetype === "application/vnd.ms-excel") {
      parsedData = await parseExcelData(file.data);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    // Insert data into the respective table
    await tableModel.bulkCreate(parsedData);

    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { insertData };
