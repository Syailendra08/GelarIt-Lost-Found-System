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





module.exports = router;