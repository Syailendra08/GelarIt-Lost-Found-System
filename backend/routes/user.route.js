const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload");

router.post("/", upload.none(), userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.showUser);
router.put("/:id", upload.none(), userController.updateUser);
router.delete("/:id", userController.deleteUser);
module.exports = router