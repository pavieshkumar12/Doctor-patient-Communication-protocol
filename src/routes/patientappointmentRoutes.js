const express = require("express");
const {patientAppointment,getallpatientAppointment,getpatientAppointmentbyId,updatepatientAppointment,deletepatientAppointment,getpatientAppointmentbypatientDisease,getpatientHistory} = require('../controllers/appointmentControllers')
const router = express.Router();
const {protect} = require("../controllers/authControllers"); // token verify 

//Create-patientAppointment
router.post("/patientAppointment",protect,patientAppointment);

//getall-patientAppointment 
router.get("/getallpatientAppointment",protect, getallpatientAppointment);

//getParticular-patientAppointment 
router.get("/getpatientAppointment/:appointmentId", protect, getpatientAppointmentbyId);

//Update-ParticularpatientAppointment
router.put("/patientAppointmentEdit/:appointmentId", protect, updatepatientAppointment);

//delete-ParticularpatientAppointment
router.delete("/patientAppointmentRemove/:appointmentId", deletepatientAppointment);

//get patientDisease and patientDetails 
router.get("/appointmentbypatientDisease/:patientDisease", getpatientAppointmentbypatientDisease);

//get patientHistory by passing doctorName
router.get("/patientHistory/:doctorName", getpatientHistory);




module.exports = router;