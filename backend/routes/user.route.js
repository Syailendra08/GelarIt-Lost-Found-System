const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload");


router.post("/", upload.none(), userController.createUser);
router.get("/export", userController.exportUsers)
router.get("/stats", userController.getUserStats);
router.get("/trash", userController.getTrashUsers);
router.patch("/trash/restore/:id", userController.restoreUser);
router.delete("/trash/force-delete/:id", userController.forceDeleteUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.showUser);
router.put("/:id", upload.none(), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;