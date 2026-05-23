const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notification.controller");




router.get(
    "/notifications",
    notificationController.getMyNotifications);



router.get(
    "/notifications/:id",
    notificationController.getNotificationById
);



router.put(
    "/notifications/:id/read",

    notificationController.readNotification
);



router.put(
    "/notifications/read-all",
   
    notificationController.readAllNotifications
);



router.delete(
    "/notifications/:id",
   
    notificationController.deleteNotification
);



router.put(
    "/notifications/restore/:id",
   
    notificationController.restoreNotification
);

module.exports = router;