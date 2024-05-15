import React, { useEffect, useState } from 'react';
import './roomcleaning.css';
import axios from "axios";
import { useSelector } from 'react-redux';
import CleaningCard from "../roomcleaning/cleaningEntry/CleaningCard";


const Roomcleaning = (props) => {
    const toShow = props.show;

    const [cleaningReqs, setCleaningReqs] = useState([]);

    const admin = useSelector((state) => {
      return state.Reducers.admin;
    });

    const showComponents = useSelector((state) => {
      return state.Reducers.showComponentsAdmin;
    });

    useEffect(() => {
      const fetchCleaningReqs = async () => {
        if(admin) {
          try {
            const res = await axios.get("/api/cleaningreq/admin");
            // console.log("cleaningReqs");
  
            // setCleaningReqs(
            //   res.data.sort((p1, p2) => {
            //     return new Date(p2.createdAt) - new Date(p1.createdAt);
            //   })
            // );
            setCleaningReqs(
              res.data
            );
            // console.log(cleaningReqs);
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("Admin not signed in!");
        }
        
      };

      fetchCleaningReqs();
  }, [showComponents]);
  
    return (
      <>
        { toShow 
            ? 
             <>
             <h1 className='title'>Room Cleaning Requests</h1>
             <div className="tableHead1">
                 <span className="headings">Student Reg No</span>
                 <span className="headings">Room Number</span>
                 <span className="studentComments">Student Comments</span>
                 <span className="headings">Completed Status</span>
                 <span className="headings">WorkerId</span>
                 <span className="headings">Date (m/d/yyyy)</span>
             </div>
             <div className='divvvvvvvv'>
                 {cleaningReqs.map((cc) => (
                   <div className="tableHead" key={cc._id}>
                     <span className="headings">{cc.studentRegNo}</span>
                     <span className="headings">{cc.room_number}</span>
                     <span className="studentComments">{cc.studentComments ? cc.studentComments : "-" }</span>
                     <span className="headings">{cc.isCompletedStatus ? "true" : "false"}</span>
                     <span className="headings">{cc.workerId}</span>
                     <span className="headings">{new Date(cc.createdAt).toLocaleDateString()} {new Date(cc.createdAt).toLocaleTimeString()}</span>
                   </div>
                 ))}
             </div>
         </>
            : <></> 
        }
      </>
    )
}

export default Roomcleaning;