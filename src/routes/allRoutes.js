const express = require("express");
const router = express.Router();

//all routes
router.use("/", require("./authRoutes"));
router.use("/", require("./patientappointmentRoutes"));
router.use("/",require("./doctorRoutes"))

module.exports = router;
