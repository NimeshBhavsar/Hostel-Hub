import mongoose from "mongoose";

//schema design
const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: Number,
      required: [true, "Id is required"],
      unique: true,
    },
    studentRegNo: {
      type: String,
      required: [true, "RegNo is required"]
    },
    room_number: {
      type: String,
      required: [true, "room number is required"]
    },
    studentComments: {
      type: String,
      required: [true, "comments are required"]
    },
    workerId: {
      type: String
    },
    isResolvedStatus: {
      type: Boolean,
      required: [true, "status is required"]
    },
    otp: {
      type: String
    }
  },
  { timestamps: true }
);

//export
const Complaint = mongoose.model("complaints", complaintSchema);

export default Complaint;
