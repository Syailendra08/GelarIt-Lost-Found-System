const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");

const upload = require("../middlewares/upload");
const {checkAdmin} = require("../middlewares/auth");

router.post(
    "/",
    upload.none(),
    locationController.createLocation
);

router.get("/",  locationController.getLocations);
router.get("/trash", locationController.getTrashLocations);
router.get("/export", locationController.exportLocations);
router.get("/:id",  locationController.showLocation);
router.put("/:id", checkAdmin, upload.none(), locationController.updateLocation);
router.delete("/:id", checkAdmin, locationController.deleteLocation);
router.patch("/trash/restore/:id", locationController.restoreLocation);
router.delete("/trash/force-delete/:id", locationController.forceDeleteLocation);


module.exports = router;