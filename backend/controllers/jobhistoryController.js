const JOB_HISTORY = require("../models/jobhistory");

async function getAllJobHistory(req, res) {
  try {
    const jobHistory = await JOB_HISTORY.findAll();
    res.json(jobHistory);
  } catch (error) {
    console.error("Error fetching job history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllJobHistory,
};
