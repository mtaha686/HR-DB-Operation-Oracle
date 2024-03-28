const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer for file upload

// Import controllers
const tablesController = require("../controllers/tablesController");
const countriesController = require("../controllers/countriesController");
const departmentController = require("../controllers/departmentsController");
const employeesController = require("../controllers/employeesController");
const jobHistoryController = require("../controllers/jobhistoryController");
const jobsController = require("../controllers/jobsController");
const locationsController = require("../controllers/locationsController");
const regionsController = require("../controllers/regionsContoller");
const dataController = require("../controllers/dataController");

// Configure multer for file upload
const upload = multer({ dest: "uploads/" });

// Define routes to get all data from tables
router.get("/", tablesController.getTableNames);
router.get("/countries", countriesController.getAllCountries);
router.get("/departments", departmentController.getAllDepartments);
router.get("/employees", employeesController.getAllEmployees);
router.get("/jobhistory", jobHistoryController.getAllJobHistory);
router.get("/jobs", jobsController.getAllJobs);
router.get("/locations", locationsController.getAllLocations);
router.get("/regions", regionsController.getAllRegions);

// Define route to upload data to tables

router.post("/insert-data", dataController.insertData);

module.exports = router;
