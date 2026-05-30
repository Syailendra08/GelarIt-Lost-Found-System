const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");

const upload = require("../middlewares/upload");
const {checkAdmin, checkToken} = require("../middlewares/auth");

router.post(
    "/",
    upload.none(),
    locationController.createLocation
);

router.get("/",  locationController.getLocations);
router.get("/trash", checkToken, checkAdmin, locationController.getTrashLocations);
router.get("/stats", checkToken, checkAdmin, locationController.getLocationStats);
router.get("/export", checkToken, checkAdmin, locationController.exportLocations);
router.get("/:id",  locationController.showLocation);
router.put("/:id", checkToken, checkAdmin, upload.none(), locationController.updateLocation);
router.delete("/:id", checkToken, checkAdmin, locationController.deleteLocation);
router.patch("/trash/restore/:id", checkToken, checkAdmin, locationController.restoreLocation);
router.delete("/trash/force-delete/:id", checkToken, checkAdmin, locationController.forceDeleteLocation);


module.exports = router;