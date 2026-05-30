const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

const {checkAdmin} = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post(
    "/",  upload.none(), checkAdmin, categoryController.createCategory
);

router.get("/", categoryController.getCategory);
router.get("/trash", checkAdmin, categoryController.getTrashCategory);
router.get("/stats", checkAdmin, categoryController.getCategoryStats);
router.get("/export", checkAdmin, categoryController.exportCategories);
router.get("/:id", categoryController.showCategory);
router.put("/:id", upload.none(), checkAdmin, categoryController.updateCategory);
router.delete("/:id", checkAdmin,  categoryController.deleteCategory)
router.patch("/trash/restore/:id", checkAdmin, categoryController.restoreCategory);
router.delete("/trash/force-delete/:id", checkAdmin, categoryController.forceDeleteCategory);



module.exports = router