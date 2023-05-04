const express = require("express");;
const app = express();
const router = require("./src/routes/allRoutes")
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan');

app.use(morgan(':method :url :status'));
app.use(express.json());
app.use(cors());
app.use(router);




// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/doctor-patient-communication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("*********🛡️🛡️  Sucessfully Connected  MongoDB 🛡️🛡️ **********"))
  .catch((err) => console.error("!!!!!!!!! Mongodb Connection Failure !!!!!!!!!!", err));



const PORT = 3000; // port number

app.listen(PORT, () => {
    console.log(`🛡️🛡️ Server started on port 🛡️🛡️  ${PORT}`);
  });


