import mongoose from "mongoose";

//schema design
const adminSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            required: [true, "name is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            min: 8,
        },
        adminEmail: {
            type: String,
            required: [true, "email is required and should be unique"],
            unique: true
        },
        adminPhone_no: {
            type: String,
            required: [true, "phone number is required"],
        },
        hostelBlockName: {
            type: String,
            required: [true, "Hostel Block Name is required"],
        }
    },
    { timestamps: true }
);

//export
const Admin = mongoose.model("admins", adminSchema);

export default Admin;
