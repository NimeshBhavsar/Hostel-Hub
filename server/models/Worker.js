import mongoose from "mongoose";

//schema design
const workerSchema = new mongoose.Schema(
  {
    workerName: {
        type: String,
        required: [true, "name is required"],
    },
    workerId: {
        type: String,
        required: [true, "Id is required"],
        unique: true,
    },
    workerEmail: {
      type: String
    },
    workerPhone_no: {
        type: String,
        required: [true, "phone number is required"],
    },
    hostelBlockName: {
        type: String,
        required: [true, "Hostel Block Name is required"],
    },
    isBusyStatus: {
        type: Number,
        required: [true, "Busy Status is required"],
    }
  },
  { timestamps: true }
);

//export
const Worker = mongoose.model("workers", workerSchema);

export default Worker;
