const mongoose = require("mongoose");
const Report = require("../models/ReportModel");

// POST: Submit a Report
const createReport = async (req, res) => {
  try {
    const { reporterId, reportedUserId, reason } = req.body;

    // Validate required fields
    if (!reporterId || !reportedUserId || !reason) {
      return res.status(400).json({ message: "All fields (reporterId, reportedUserId, reason) are required." });
    }

    // Validate ObjectId format for reporter and reportedUser
    if (!mongoose.Types.ObjectId.isValid(reporterId) || !mongoose.Types.ObjectId.isValid(reportedUserId)) {
      return res.status(400).json({ message: "Invalid ID format for reporter or reported user." });
    }

    // Check if the reporter has already reported this user
    const existingReport = await Report.findOne({ reporterId, reportedUserId });
    if (existingReport) {
      return res.status(400).json({ message: "You have already reported this user." });
    }

    // Create and save the report
    const newReport = new Report({
      reporterId,
      reportedUserId,
      reason,
    });

    await newReport.save();

    return res.status(201).json({
      message: "Report submitted successfully.",
      data: newReport,
    });
  } catch (error) {
    console.error("Error in createReport:", error);
    return res.status(500).json({ message: "An error occurred while submitting the report." });
  }
};

// GET: Fetch All Reports for a Specific User
const getReportsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Fetch reports for the specified user
    const reports = await Report.find({ reportedUserId: userId })
      .populate("reporterId", "username email") // Populate reporter details (e.g., username, email)
      .sort({ createdAt: -1 }); // Sort by most recent

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found for this user." });
    }

    return res.status(200).json({
      message: "Reports retrieved successfully.",
      data: reports,
    });
  } catch (error) {
    console.error("Error in getReportsForUser:", error);
    return res.status(500).json({ message: "An error occurred while fetching reports." });
  }
};

// GET: Fetch All Reports (Admin Use)
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporterId", "username email")
      .populate("reportedUserId", "username email")
      .sort({ createdAt: -1 });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found." });
    }

    return res.status(200).json({
      message: "All reports retrieved successfully.",
      data: reports,
    });
  } catch (error) {
    console.error("Error in getAllReports:", error);
    return res.status(500).json({ message: "An error occurred while fetching all reports." });
  }
};

// PUT: Update Report Status (Admin Use)
const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    // Validate ObjectId format for reportId
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({ message: "Invalid report ID format." });
    }

    // Validate status
    if (!["Pending", "Reviewed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Allowed values: 'Pending', 'Reviewed'." });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found." });
    }

    return res.status(200).json({
      message: "Report status updated successfully.",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error in updateReportStatus:", error);
    return res.status(500).json({ message: "An error occurred while updating the report status." });
  }
};

module.exports = {
  createReport,
  getReportsForUser,
  getAllReports,
  updateReportStatus,
};
