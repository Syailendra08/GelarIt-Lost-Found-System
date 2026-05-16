const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");


const upload = require("../middlewares/upload");

router.post(
    "/",  upload.none(), categoryController.createCategory
);

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.showCategory);
router.put("/:id", upload.none(), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory)
router.patch("/restore/:id",  categoryController.restoreCategory);


module.exports = router