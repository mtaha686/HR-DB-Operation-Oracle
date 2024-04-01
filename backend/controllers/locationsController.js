const LOCATIONS = require("../models/locations");

async function getAllLocations(req, res) {
  try {
    const locations = await LOCATIONS.findAll();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllLocations,
};
