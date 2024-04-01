const EMPLOYEES = require("../models/employees");

async function getAllEmployees(req, res) {
  try {
    const employees = await EMPLOYEES.findAll();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllEmployees,
};
