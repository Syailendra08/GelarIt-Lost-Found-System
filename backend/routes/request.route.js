const express = require("express");
const router = express.Router();

const requestController = require("../controllers/request.controller");


const {checkToken} = require("../middlewares/auth");
const {checkAdmin} = require("../middlewares/auth");
const upload = require("../middlewares/upload");



router.post("/items/:id/requests", checkToken, upload.none(), requestController.createRequest);
router.get("/requests", checkToken, requestController.getAllRequests);
router.get("/requests/trash", checkToken, checkAdmin, requestController.getTrashRequests);
router.get("/requests/:id", checkToken, requestController.getRequestById);
router.get("/items/:id/requests", checkToken, requestController.getRequestsByItem);
router.put("/requests/:id/approve", checkToken, checkAdmin, requestController.approveRequest);
router.patch("/requests/:id/reject", checkToken, checkAdmin, requestController.rejectRequest);
router.patch("/requests/:id/taken", checkToken, checkAdmin, requestController.markAsTaken);

router.delete("/requests/:id", checkToken, requestController.deleteRequest);
router.put("/requests/trash/restore/:id", checkToken, checkAdmin, requestController.restoreRequest);
router.delete("/requests/trash/force-delete/:id", checkToken, checkAdmin, requestController.forceDeleteRequest);
module.exports = router;