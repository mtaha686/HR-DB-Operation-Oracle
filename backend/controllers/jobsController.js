const Job = require("../models/jobs");

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllJobs,
};
