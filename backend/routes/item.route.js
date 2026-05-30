const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const upload = require("../middlewares/upload");
const {checkToken} = require("../middlewares/auth");
const {checkAdmin} = require("../middlewares/auth");

router.post("/", upload.single('image'), checkToken, itemController.createItem);

router.get("/", itemController.getItems);
router.get("/trash", checkToken, checkAdmin, itemController.getTrashItems);
router.get("/export", checkToken, checkAdmin,  itemController.exportItems);
router.get("/stats", checkToken, checkAdmin, itemController.getItemStats);
router.get("/:id", checkToken, itemController.showItem)
router.put("/:id", checkToken, upload.single('image'), itemController.updateItem)
router.get("/users/:id", checkToken, itemController.getItemsByUser);


router.delete("/:id", checkToken, itemController.deleteItem)
router.patch("/trash/restore/:id", checkToken, checkAdmin, itemController.restoreItem);
router.delete("/trash/force-delete/:id", checkToken, checkAdmin, itemController.forceDeleteItem);


module.exports = router;