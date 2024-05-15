import { useEffect, useState } from "react";
import axios from "axios";
import CleaningCard from "../roomcleaning/cleaningEntry/CleaningCard";
import ComplaintCard from "../complaint/complaintEntry/ComplaintCard";
import { useSelector } from "react-redux";
import "./dashboard.css";

const Dashboard = (props) => {
    const toShow = props.show;
    const [cleaningReqs, setCleaningReqs] = useState([]);
    const [complaints, setComplaints] = useState([]);

    const student = useSelector((state) => {
      return state.Reducers.user;
    });
    const showComponents = useSelector((state) => {
      return state.Reducers.showComponents;
    });
    
    useEffect(() => {
      const fetchCleaningReqs = async () => {
        if(student) {
          try {
            const res = await axios.post("/api/cleaningreq/all/" + student.studentRegNo, {isStudent: true});
            
            setCleaningReqs(
              res.data
            );
            // console.log(cleaningReqs);
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("Student not signed in!");
        }
        
      };

      const fetchComplaints = async () => {
        try {
          const res = await axios.post("/api/complaint/all/" + student.studentRegNo, {isStudent: true});
              // console.log(res.data);

          setComplaints(
            res.data
          );
          // console.log(cleaningReqs);
        } catch (error) {
          console.log(error)
        }
      };

      fetchCleaningReqs();
      fetchComplaints();

    },[showComponents]);

    return (
      <>
        { toShow 
            ? <div className='dashboardwrapper'>
                 <h1 className='title'>Dashboard</h1>
                 <div>
                  <h2>Cleaning Reqs:</h2>
                  <div>
                    <div className="tableHead1">
                        <span className="headings">Student Reg No</span>
                        {/* <span className="headings">Room Number</span> */}
                        <span className="studentComments">Student Comments</span>
                        <span className="headings">Completed Status</span>
                        <span className="headings">Date (m/d/yyyy)</span>
                        <span className="headings">Enter OTP</span>

                    </div>
                    <div className="mapData">
                    {cleaningReqs.map((c) => (
                        c.map((cc) => (
                          <CleaningCard key={cc._id} cleaningreq={cc} />
                        ))
                      ))}
                    </div>
                 </div>

                 </div>
                 <div>
                 <h2>Complaints:</h2>
                 <div>
                    <div className="tableHead1">
                        <span className="headings">Student Reg No</span>
                        {/* <span className="headings">Room Number</span> */}
                        <span className="studentComments">Student Comments</span>
                        <span className="headings">Resolved Status</span>
                        <span className="headings">Date (m/d/yyyy)</span>
                    </div>
                    <div className="mapData">
                        {complaints.map((cc) => (
                            <ComplaintCard key={cc._id} complaint={cc} />
                          ))}
                    </div>
                 </div>
                </div>
             </div> 
            : <></> }
      </>
    )
}

export default Dashboard;