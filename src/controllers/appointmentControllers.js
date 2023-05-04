const Appointment = require("../modules/appointmentModule");
const Doctor = require("../modules/doctorModule");


//create new patientAppointment
const patientAppointment = async (req, res, next) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: savedAppointment,
    });
  } catch (err) {
    next(err);
  }
};

//getallpatientAppointment and search also using
const getallpatientAppointment = async (req, res, next) => {
  try {
    const { search } = req.query;
    let appointments;
    if (search) {
      appointments = await Appointment.find({
        $or: [
          { doctorName: { $regex: search, $options: "i" } },
          { patientName: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      appointments = await Appointment.find();
    }

    res.status(200).json(appointments);

  } catch (err) {
    next(err);
  }
}

//get particular patientAppointment
const getpatientAppointmentbyId = async (req, res, next) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment is not found" });
    }
    res.status(200).json(appointment);

  } catch (err) {
    next(err);
  }
}

//update particular patientAppointment
const updatepatientAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointmentData = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      appointmentData,
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};


//delete particular patientAppointment
const deletepatientAppointment = async (req, res, next) => {
  try {
    const deletepatient = await Appointment.findByIdAndDelete(req.params.appointmentId);
    if (!deletepatient) {
      return res.status(404).json({ message: "patientAppointment is not found" });
    }
    res.status(200).json({ message: "patientAppointment deleted successfully" });
  } catch (err) {
    next(err);
  }
};


//get patientDisease and patientDetails  && aggregate function using inside
const getpatientAppointmentbypatientDisease = async (req, res, next) => {
  try {
    const patientDisease = req.params.patientDisease;
    const patientDetails = await Appointment.aggregate([
      { $unwind: '$patientDisease' },
      {
        $group: {
          _id: '$patientDisease',
          patientDiseaseCount: { $sum: 1 },
          patientDetails: {
            $push: {
              patientName: '$patientName', doctorName: '$doctorName',
              appointmentDate: '$appointmentDate', appointmentTime: '$appointmentTime',
              PatientDescription: '$PatientDescription', bloodGroup: '$bloodGroup'
            }
          },
        }
      },
      { $addFields: { patientDisease: '$_id' } },
      { $match: { patientDisease: patientDisease } },
      { $project: { _id: 0 } },
      { $sort: { patientDiseaseCount: -1 } },
    ]);
    res.send(patientDetails);
  } catch (err) {
    next(err);
  }
};

//get patientHistory passing doctorname in params using populate function
const getpatientHistory = async (req, res, next) => {
  try {
    const doctorName = req.params.doctorName;
    await Appointment.find({ doctorName });
    const doctor = await Doctor.findOneAndUpdate({ doctorName }, { new: true })
      .populate({
        path: "appointments",
        select: "patientName appointmentDate appointmentTime patientDisease patientDescription address"
      })
      .select("doctorName");
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  patientAppointment, getallpatientAppointment,
  getpatientAppointmentbyId, updatepatientAppointment,
  deletepatientAppointment,
  getpatientAppointmentbypatientDisease, getpatientHistory
};
