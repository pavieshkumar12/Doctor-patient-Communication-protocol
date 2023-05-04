const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "patientName is required"],
  },
  doctorName: {
    type: String,
    required: [true, "doctorName is required"],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "phoneNumber is required"],
  },
  patientDisease: {
    type: String,
    required: [true, "patientDisease is required"],
  },
  bloodGroup: {
    type: String,
    required: [true, "bloodGroup is required"],
  },
  PatientDescription: {
    type: String,
    required: [true, "PatientDescription is required"],
  },
  appointmentDate: {
    type: String,
    required: [true, "appointmentDate is required"]
  },
  appointmentTime: {
    type: String,
    required: [true, "appointmentTime is required"]
  }
});

const Appointment = mongoose.model("Appointments", appointmentSchema);

module.exports = Appointment;
