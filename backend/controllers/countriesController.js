const Country = require("../models/countries");
const sequelize = require("../config/db");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

async function getAllCountries(req, res) {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllCountries,
};
