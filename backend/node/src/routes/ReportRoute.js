const express = require("express");
const router = express.Router();
const { createReport,  getAllReports } = require("../controllers/ReportController");

// Route to create a report
router.post("/report/create", createReport);

// Route to get all reports
router.get("/allreport",  getAllReports); 

module.exports = router;
