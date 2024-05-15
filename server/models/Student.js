import mongoose from "mongoose";

//schema design
const studentSchema = new mongoose.Schema(
  {
    studentName: {
        type: String,
        required: [true, "name is required"],
    },
    studentRegNo: {
        type: String,
        required: [true, "RegNo is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: 8,
    },    
    room_number: {
        type: String,
        required: [true, "room number is required"],
    },
    studentEmail: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true
    },
    studentPhone_no: {
        type: String,
        required: [true, "phone number is required"],
    },
    hostelBlockName: {
        type: String,
        required: [true, "Hostel Block Name is required"],
    
    },
    hostelFloorNo: {
        type: String,
        required: [true, "Hostel Block Name is required"]
    }
  },
  { timestamps: true }
);

//export
const Student = mongoose.model("students", studentSchema);

export default Student;
