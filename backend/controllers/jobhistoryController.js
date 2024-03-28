const JobHistory = require("../models/jobhistory");

async function getAllJobHistory(req, res) {
  try {
    const jobHistory = await JobHistory.findAll();
    res.json(jobHistory);
  } catch (error) {
    console.error("Error fetching job history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllJobHistory,
};
