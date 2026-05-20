const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

const {checkAdmin} = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post(
    "/",  upload.none(), checkAdmin, categoryController.createCategory
);

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.showCategory);
router.put("/:id", upload.none(), checkAdmin, categoryController.updateCategory);
router.delete("/:id", checkAdmin,  categoryController.deleteCategory)
router.patch("/restore/:id", checkAdmin,  categoryController.restoreCategory);


module.exports = router