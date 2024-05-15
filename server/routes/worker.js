import Worker from "../models/Worker.js";
import express from "express";
const router = express.Router();


// create
router.post("/register", async (req, res) => {
    if(req.body.isAdmin) {
        try {

            //create new worker
            const newWorker = new Worker({
              workerName: req.body.workerName,
              workerId: req.body.workerId,
              workerEmail: req.body.workerEmail,
              workerPhone_no: req.body.workerPhone_no,
              hostelBlockName: req.body.hostelBlockName,
              isBusyStatus: req.body.isBusyStatus
            });
        
            //save worker and respond
            const worker = await newWorker.save();
            return res.status(200).json(worker);
          } catch (err) {
            return res.status(500).json(err);
          }    
    } else {
        return res.status(403).json("You are not Admin!");
    }
}); 
    
// read (get a worker)
router.get("/", async (req, res) => {
    if(req.body.isAdmin) {
        try {
        const worker = await Worker.findOne({workerId: req.query.workerId});
        res.status(200).json(worker);
        } catch (err) {
        return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not Admin!");
    }
});

// get all workers
router.get("/admin", async (req, res) => {
      try {
      const workers = await Worker.find({});
      res.status(200).json(workers);
      } catch (err) {
      return res.status(500).json(err);
      }
});

// update worker
router.put("/:id", async (req, res) => {
    if(req.body.isAdmin) {
      try {
        const worker = await Worker.findOneAndUpdate({workerId: req.params.id}, {
          $set: req.body
        });
        return res.status(200).json("Worker has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
        return res.status(403).json("You are not Admin!");
    }
});


// delete
router.delete("/:id", async (req, res) => {
      try {
        await Worker.findOneAndDelete({workerId: req.params.id});
        res.status(200).json("Worker has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
});


export { router as workerRoute };
