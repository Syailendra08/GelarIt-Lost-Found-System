const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const upload = require("../middlewares/upload");

router.post(
    "/lost", upload.single('image'), itemController.createItem
);

router.post("/found", upload.single('image'), itemController.addFoundItem);

router.get(
    "/",
    itemController.getItems
);

router.get("/:id", itemController.showItem)
router.put("/:id", upload.single('image'), itemController.updateItem);
router.delete("/:id", itemController.deleteItem)
router.patch("/restore/:id",  itemController.restoreItem);

module.exports = router;