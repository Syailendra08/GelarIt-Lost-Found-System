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
router.get("/:id",  locationController.showLocation);
router.put("/:id", checkAdmin, upload.none(), locationController.updateLocation);
router.delete("/:id", checkAdmin, locationController.deleteLocation);
router.patch("/restore/:id", checkAdmin, locationController.restoreLocation);

module.exports = router;