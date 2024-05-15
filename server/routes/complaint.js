import Complaint from "../models/Complaint.js";
import express from "express";
const router = express.Router();


// create
router.post("/register", async (req, res) => {
    if(req.body.isStudent) {
        try {
            //find if already present 
            const presentComplaints = await Complaint.find({studentRegNo: req.body.studentRegNo, isResolvedStatus: false});  
            
            if(presentComplaints.length > 2) {
              // do not allow
              return res.status(403).json("previous complaint is already in Queue!");

            } else {
              //count
              const allReqs = await Complaint.find();

              //create new complaint
              const newComplaint = new Complaint({
                studentRegNo: req.body.studentRegNo,
                room_number: req.body.room_number,
                studentComments: req.body.studentComments,
                workerId: "",
                isResolvedStatus: false,
                otp: Math.floor(100000 + Math.random() * 900000),
                complaintId: allReqs.length+1
              });
          
              //save complaint and respond
              const complaint = await newComplaint.save();
              return res.status(200).json(complaint);
            }
            
          } catch (err) {
             return res.status(500).json(err);
          }    
    } else {
        return res.status(403).json("Student not logged in.");
    }
}); 
    
// read (get a complaint)
router.get("/", async (req, res) => {
    if(req.body.isStudent) {
        try {
        const complaint = await Complaint.findById(req.query.complaintId);
        res.status(200).json(complaint);
        } catch (err) {
        return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});

//get all complaints
router.post("/all/:studentRegNo", async (req, res) => {
  if(req.body.isStudent) {
    try {
      const currentStudentComplaints = await Complaint.find({studentRegNo: req.params.studentRegNo});  

      return res.status(200).json(currentStudentComplaints);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Student not logged in.");
  }
});

//get all complaints for admin
router.get("/admin", async (req, res) => {
  try {
    const allAdminComplaints = await Complaint.find({});  

    return res.status(200).json(allAdminComplaints);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update complaint
router.put("/:id", async (req, res) => {
    if(req.body.isStudent) {
      try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, {
          $set: req.body
        });
        return res.status(200).json("complaint has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
        return res.status(403).json("Student not logged in.");
    }
});


//update using patch
router.patch("/:id", async (req, res) => {
  if(req.body.isAdmin) {
    try {
      const complaint = await Complaint.findOneAndUpdate({complaintId: req.params.id}, {
        $set: {isResolvedStatus: req.body.isResolvedStatus}
      });
      return res.status(200).json("complaint has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
      return res.status(403).json("Admin not logged in.");
  }
});


// delete
router.delete("/:id", async (req, res) => {
    if (req.body.isStudent) {
      try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.status(200).json("complaint has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("Student not logged in.");
    }
});


export { router as complaintRoute };
