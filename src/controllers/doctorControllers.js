const Doctor = require("../modules/doctorModule");

//Create Doctor
const createDoctor = async (req, res, next) => {
  try {
    const createDoctor = new Doctor(req.body);
    const savedDoctor = await createDoctor.save();
    res.status(201).json({
      message: "Doctor details created successfully",
      doctor: savedDoctor,
    });
  } catch (err) {
    next(err);
  }
};

//getallDoctor
const getallDoctor = async (req,res, next) => {
  try {
    const allDoctor = await Doctor.find();
    res.status(200).json(allDoctor);
  } catch (err) {
    next(err);
  }
}


//Update particular Doctor
const updateDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const doctorDetails = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      doctorDetails,
      { new: true }
    );
    res.status(200).json(updatedDoctor);
  } catch (err) {
    next(err);
  }
};

//delete particular Doctor
const deleteDoctor = async (req, res, next) => {
  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(req.params.doctorId);
    if (!deleteDoctor) {
      return res.status(404).json({ message: "Doctor details is not found" });
    }
    res.status(200).json({ message: "Doctor details deleted successfully" });
  } catch (err) {
    next(err);
  }
};

//get  getdoctor AppointmentDetails and lookup aggregate function used
const getdoctorAppointmentDetails = async (req, res, next) => {
  try {
    const doctorName = req.params.doctorName;
    const doctorDetails = await Doctor.aggregate([
      {$match: {doctorName: doctorName}},
      {$lookup: {
        from: 'appointments',
        let: { doctorName: '$doctorName' },
        pipeline: [
          {$match: {$expr: {$eq: ['$doctorName', '$$doctorName']}}},
          {$project: { _id: 0, patientName: 1,patientDisease: 1,appointmentDate:1 }},
        ],
        as: 'appointments',
      }},
    ]);
    res.send(doctorDetails);
  } catch (err) {
    next(err);
  }
};


module.exports = { createDoctor,updateDoctor,deleteDoctor,getallDoctor,getdoctorAppointmentDetails };