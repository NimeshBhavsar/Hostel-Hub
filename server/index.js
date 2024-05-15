import mongoose from 'mongoose';
import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {authRoute} from "./routes/auth.js";
import {cleaningreqRoute} from "./routes/cleaningreq.js";
import {complaintRoute} from "./routes/complaint.js";
import {workerRoute} from "./routes/worker.js";

const port = 8080;   
const app = express();  
const router = express.Router();

app.use(express.json()); // to support JSON-encoded bodies
app.use(helmet());
app.use(morgan("common"));

try {
    mongoose.connect(process.env.MONGO_URL); 
    console.log("Database connection success!");
} catch (e){
    console.log(e);
}

app.use("/api/auth", authRoute);
app.use("/api/worker", workerRoute);
app.use("/api/complaint", complaintRoute);
app.use("/api/cleaningreq", cleaningreqRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 














//the server object listens on port 8080

// app.get('/compreq/', (req, res) => {

//     const { id } = req.body;
//     const { message } = req.body;
//     res.status(200);
//     if (!id) {
//         res.status(418);
//         res.send({ message: 'We need a id!' });

//     }
//     else
//         res.send({
//             "Name": "Nimesh Bhavsar",
//             "Room Number": "101",
//             "Phone Number": "1234567890",
//             "Message": `${message}`
//         });
// });


// app.post("/postcomplaint", function (req, res) {
//     const complaint = new complaintModel({
//       name: req.body.name,
//       email: req.body.email,
//       room_number: req.body.room_number,
//       phone_no: req.body.phone_no,
//       comments: req.body.comments
//     });
//     try {
//         complaint.save();
//         res.send(complaint);

//     } catch (e){
//         console.log(e);
//     }
    
//  });
//  app.post("/postcleaningreq", function (req, res) {
//     const cleaningReq = new cleaningreqModel({
//       name: req.body.name,
//       email: req.body.email,
//       room_number: req.body.room_number,
//       phone_no: req.body.phone_no,
//       comments: req.body.comments
//     });
//     try {
//         cleaningReq.save();
//         res.send(cleaningReq);

//     } catch (e){
//         console.log(e);
//     }
    
//  });