const students = require("../models/students");

async function getAllStudents(req, res) {
  try {
    const student = await students.findAll();
    res.json(student);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllStudents,
};
