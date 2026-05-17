const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");



const upload = require("../middlewares/upload");



router.post(
    "/items/:id/comments",
    upload.none(),
    commentController.createComment
);


router.get("/items/:id/comments", commentController.getCommentsByItem);

router.put(
    "/comments/:id", upload.none(), commentController.updateComment);

router.delete("/comments/:id",  commentController.deleteComment);


router.patch("/comments/restore/:id",  commentController.restoreComment
);

module.exports = router;