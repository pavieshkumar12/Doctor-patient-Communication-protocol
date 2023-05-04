const express = require("express");
const {createDoctor,getallDoctor,updateDoctor,deleteDoctor,getdoctorAppointmentDetails} = require('../controllers/doctorControllers')
const router = express.Router();
const {protect} = require("../controllers/authControllers") //token verify 

//Create Doctor
router.post("/addDoctor",protect,createDoctor)

//getallDoctor
router.get("/getallDoctor",protect, getallDoctor);

//update-particularDoctor
router.put("/DoctorEdit/:doctorId", protect, updateDoctor);

//delete-particularDoctor
router.delete("/doctorRemove/:doctorId", deleteDoctor);

//get doctorDetails passing doctorName in params
router.get("/doctorDetails/:doctorName", protect, getdoctorAppointmentDetails);


module.exports = router;