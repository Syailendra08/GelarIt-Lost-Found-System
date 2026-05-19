const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const upload = require("../middlewares/upload");
const {checkToken} = require("../middlewares/auth");
const {checkAdmin} = require("../middlewares/auth");

router.post(
    "/", upload.single('image'), checkToken, itemController.createItem
);

router.get(
    "/",
    itemController.getItems
);

router.get(
    "/users/:id",
    checkToken,
    itemController.getItemsByUser
)


router.get("/:id", checkToken, itemController.showItem)
router.put("/:id", checkToken, upload.single('image'), itemController.updateItem)
router.delete("/:id", checkToken, itemController.deleteItem)
router.patch("/restore/:id", checkToken, checkAdmin,  itemController.restoreItem);

module.exports = router;