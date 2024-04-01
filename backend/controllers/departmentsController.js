const DEPARTMENTS = require("../models/departments");

async function getAllDepartments(req, res) {
  try {
    const departments = await DEPARTMENTS.findAll();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllDepartments,
};
