import { useSelector } from "react-redux";
import "./profile.css";

const Profile = (props) => {

    const toShow = props.show;
    
    const student = useSelector((state) => {
        return state.Reducers.user;
      });

    return (
        <>
        { toShow 
            ? <div className="divvv">
                <h1>Profile Page </h1>
                <p name="studName" className='studentdetails'>Name: {student.studentName}</p>
                <p name="studName" className='studentdetails'>Reg. No.: {student.studentRegNo}</p>
                <p name="studRoomNo" className='studentdetails'>Hostel Block: {student.hostelBlockName}</p>
                <p name="studRoomNo" className='studentdetails'>Floor No.: {student.hostelFloorNo}</p>
                <p name="studRoomNo" className='studentdetails'>Room Number: {student.room_number}</p>
                <p name="studPhoneNo" className='studentdetails'>Phone Number: {student.studentPhone_no}</p>
                <p name="studEmailId" className='studentdetails'>Email: {student.studentEmail}</p> 
            </div>
            : <></>
        }
        </>
    );
};

export default Profile;