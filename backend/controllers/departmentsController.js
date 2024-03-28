const Department = require("../models/departments");

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllDepartments,
};
