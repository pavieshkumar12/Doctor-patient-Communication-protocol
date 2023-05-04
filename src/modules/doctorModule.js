const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
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

  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments" }]
});


const Doctor = mongoose.model("Doctors", doctorSchema);

module.exports = Doctor;
