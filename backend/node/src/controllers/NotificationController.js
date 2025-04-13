// const Notification = require("../models/NotificationModel");

// // Create a Notification
// const createNotification = async (req, res) => {
//   try {
//     const notification = await Notification.create(req.body);
//     res.status(201).json({ message: "Notification created successfully", data: notification });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get Notifications by User
// const getNotificationsByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ message: "Notifications retrieved successfully", data: notifications });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // // Mark Notification as Read
// const markNotificationAsRead = async (req, res) => {
//   try {
//     const { notificationId } = req.params;
//     const updatedNotification = await Notification.findByIdAndUpdate(
//       notificationId,
//       { isRead: true },
//       { new: true }
//     );
//     res.status(200).json({ message: "Notification marked as read", data: updatedNotification });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { createNotification,
//      getNotificationsByUser, 
//      markNotificationAsRead
//      };
