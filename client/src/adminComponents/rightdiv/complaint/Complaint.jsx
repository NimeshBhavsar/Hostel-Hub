import React, { useEffect, useState } from 'react';
import './complaint.css';
import axios from "axios";
import { useSelector } from 'react-redux';

const Complaint = (props) => {

    const toShow = props.show;
    const [newW, setNew] = useState(false);

    const [complaints, setComplaints] = useState([]);

    const admin = useSelector((state) => {
      return state.Reducers.admin;
    });

    const showComponents = useSelector((state) => {
      return state.Reducers.showComponentsAdmin;
    });

    const handleResolve = async (id) => {
      console.log(id);
      // event.preventDefault();
      await axios.patch("/api/complaint/"+id,
          {
            isResolvedStatus: true,
            isAdmin: true
          }
        );
        newW ? setNew(false) : setNew(true);
    }

    useEffect(() => {
      const fetchComplaints = async () => {
        if(admin) {
          try {
            const res = await axios.get("/api/complaint/admin");
  
            // setComplaints(
            //   res.data.sort((p1, p2) => {
            //     return new Date(p2.createdAt) - new Date(p1.createdAt);
            //   })
            // );
            setComplaints(
              res.data
            );
            // console.log(complaint);
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("Admin not signed in!");
        }
        
      };

      fetchComplaints();
  }, [newW, showComponents]);
  

    return (
      <>
        { toShow 
            ? 
              <>
                  <h1 className='title'>Complaints</h1>
                  <div className="tableHead1">
                      <span className="headings">Student Reg No</span>
                      <span className="headings">Room Number</span>
                      <span className="studentComments">Student Comments</span>
                      <span className="headings">Resolved Status</span>
                      <span className="headings">Date (m/d/yyyy)</span>
                      <span className="headings">Update Status</span>
                  </div>
                  <div className='divvvvvvvv'>
                      {complaints.map((cc) => (
                        <div className="tableHead" key={cc._id}>
                          <span className="headings">{cc.studentRegNo}</span>
                          <span className="headings">{cc.room_number}</span>
                          <span className="studentComments">{cc.studentComments ? cc.studentComments : "--" }</span>
                          <span className="headings">{cc.isResolvedStatus ? "true" : "false"}</span>
                          <span className="headings">{new Date(cc.createdAt).toLocaleDateString()} {new Date(cc.createdAt).toLocaleTimeString()}</span>
                          <span className="headings">{!cc.isResolvedStatus ? <button className="headings" onClick={(e) => handleResolve(cc.complaintId)}>Mark as Resolved</button> : <>Resolved</>}</span>

                        </div>
                      ))}
                  </div>
              </>
            : <></> 
        }
      </>
        
    )
}

export default Complaint;