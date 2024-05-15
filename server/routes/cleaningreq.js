import CleaningReq from "../models/CleaningReq.js";
import Student from "../models/Student.js";
import Worker from "../models/Worker.js";

import express from "express";
const router = express.Router();


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
import twilio from "twilio";
const client = twilio(accountSid, authToken);

// create
router.post("/register", async (req, res) => {
    if (req.body.isStudent) {
        try {
            // console.log("a1");

            //find if already present 
            const presentComplaints = await CleaningReq.find({ room_number: req.body.room_number, isCompletedStatus: false });
            //  console.log(presentComplaints.length);
            //  console.log("a2");

            if (presentComplaints.length > 0) {
                // do not allow
                //  console.log("a10");
                console.log("previous request is already in Queue!");
                return res.status(403).json("previous request is already in Queue!");

            } else {
                //assign worker
                //count requests
                const allReqs = await CleaningReq.find();
                const workers = await Worker.find();

                const assignedWorker = (allReqs.length % workers.length) + 1;

                //find Worker phone
                const workerDetails = await Worker.find({ workerId: "W" + assignedWorker });
                const workerPhone = workerDetails[0].workerPhone_no;
                console.log(workerPhone);


                //send otp
                const sendMsg = async (body) => {
                    const msgText = {
                        from: "+17174155960",
                        to: `+91${workerPhone}`,
                        body
                    }
                    try {
                        const message = await client.messages.create(msgText);
                        console.log(message);
                    } catch (error) {
                        console.log(error);
                    }
                }
                const otp = Math.floor(100000 + Math.random() * 900000);

                // create new cleaningreq
                const newCleaningReq = new CleaningReq({
                    studentRegNo: req.body.studentRegNo,
                    room_number: req.body.room_number,
                    studentComments: req.body.studentComments,
                    workerId: "W" + assignedWorker,
                    isCompletedStatus: false,
                    otp: otp,
                    cleaningreqId: allReqs.length + 1
                });
                //  console.log("a5");

                //save cleaningreq and respond
                const cleaningreq = await newCleaningReq.save();
                const cleanreqId = allReqs.length + 1;
                sendMsg("\n\nFrom HostelHub\n\nRequest Id: " + cleanreqId + "\nRoom No.: " + req.body.room_number + "\nRoom Cleaning OTP is: " + otp + "\n\nInstructions: " + req.body.studentComments);
                return res.status(200).json(cleaningreq);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});

// read (get a cleaningreq)
router.get("/", async (req, res) => {
    if (req.body.isStudent) {
        try {
            const cleaningreq = await CleaningReq.findById(req.query.cleaningreqId);
            res.status(200).json(cleaningreq);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});

//get all cleaningreqs by all roommates
router.post("/all/:studentRegNo", async (req, res) => {
    if (req.body.isStudent) {
        try {
            const currentStudent = await Student.findOne({ studentRegNo: req.params.studentRegNo });
            const roommates = await Student.find({ room_number: currentStudent.room_number });
            // console.log(roommates);
            const allRoommatesCleaningReqs = await Promise.all(
                roommates.map((student) => {
                    return CleaningReq.find({ studentRegNo: student.studentRegNo });
                })
            );

            return res.status(200).json(allRoommatesCleaningReqs);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});

//get all cleaningreqs for admin
router.get("/admin", async (req, res) => {
    try {
        const allAdminCleaningReqs = await CleaningReq.find({});

        return res.status(200).json(allAdminCleaningReqs);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// update cleaningreq
router.put("/:id", async (req, res) => {
    if (req.body.isStudent) {
        try {
            const cleaningreq = await CleaningReq.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            return res.status(200).json("cleaningreq has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});

//update using patch
router.patch("/:id", async (req, res) => {
    if (req.body.isStudent) {
        try {
            const cleaningreq = await CleaningReq.findOneAndUpdate({ cleaningreqId: req.params.id }, {
                $set: { isCompletedStatus: req.body.isCompletedStatus }
            });
            return res.status(200).json("cleaningreq has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});


// delete
router.delete("/:id", async (req, res) => {
    if (req.body.isStudent) {
        try {
            await CleaningReq.findByIdAndDelete(req.params.id);
            res.status(200).json("cleaningreq has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});


export { router as cleaningreqRoute };
