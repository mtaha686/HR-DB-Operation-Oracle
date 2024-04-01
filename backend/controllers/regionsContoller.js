const REGIONS = require("../models/regions");

async function getAllRegions(req, res) {
  try {
    const regions = await REGIONS.findAll();
    res.json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllRegions,
};
