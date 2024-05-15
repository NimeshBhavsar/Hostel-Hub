import React, { useEffect, useState } from 'react';
import './worker.css';
import axios from "axios";
import { useSelector } from 'react-redux';


const Worker = (props) => {
  
    const toShow = props.show;
    const [workers, setWorkers] = useState([]);

    const [Wid, setId] = useState("");
    const [Wname, setName] = useState("");
    const [Wemail, setEmail] = useState("");
    const [Wphone, setPhone] = useState("");

    const [newW, setNewW] = useState(false);

    const admin = useSelector((state) => {
      return state.Reducers.admin;
    });

    const showComponents = useSelector((state) => {
      return state.Reducers.showComponentsAdmin;
    });

    useEffect(() => {
      const fetchWorkers = async () => {
        if(admin) {
          try {
            const res = await axios.get("/api/worker/admin");
            setWorkers(
              res.data
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Admin not signed in!");
        }
        
      };

      fetchWorkers();
  }, [newW, showComponents]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(admin){
      try {
        const res = await axios.post("/api/worker/register", 
          { workerId: Wid,
            workerName: Wname,
            workerEmail: Wemail,
            workerPhone_no: Wphone,
            hostelBlockName: "F",
            isBusyStatus: 0,
            isAdmin: true
          }
        );

        setId("");
        setName("");
        setEmail("");
        setPhone("");

        newW ? setNewW(false) : setNewW(true);
        alert("New Worker Added Successfully.");

      } catch (error) {
        console.log("Error in registering worker");
      }
    } else {
      console.log("Admin not signed in!");
    }
  }

  const handleDelete = async (delWId) => {
    console.log(delWId);
    if(admin){
      try {
        const res = await axios.delete("/api/worker/" + delWId);

        newW ? setNewW(false) : setNewW(true);

      } catch (error) {
        console.log("Error in deleting worker");
        
      }
    } else {
      console.log("Admin not signed in!");
    }
  }
  
    return (
      <>
        { toShow 
            ? <div className='dashboardwrapper'>
                 <h1 className='title'>Add Workers</h1>
                 <form className='complaintForm' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Id' className="loginforminput" value={Wid} onChange={(e) => setId(e.target.value)} required/> <br/>
                    <input type="text" placeholder='Name' className="loginforminput" value={Wname} onChange={(e) => setName(e.target.value)} required/> <br/>
                    <input type="email" placeholder='Email' className="loginforminput" value={Wemail} onChange={(e) => setEmail(e.target.value)} required/> <br/>
                    <input type="text" placeholder='Phone No' className="loginforminput" value={Wphone} onChange={(e) => setPhone(e.target.value)} required/> <br/>
                    <button type="submit" className='complaintButton' id="complaintButtonId">Add</button>
                </form>

                <h1 className='title'>Workers List</h1>
                 <div className="tableHead1">
                    <span className="headings">Worker Id</span>
                    <span className="headings">Worker Name</span>
                    {/* <span className="headings">Worker Name</span> */}
                    {/* <span className="headings">Busy Status</span> */}
                    <span className="headings">Updated At (m/d/yyyy)</span>
                    <span className="headings">Delete Worker</span>
                  </div>
                 <div className='wend'>
                      {workers.map((w) => (
                        <div className="tableHead" key={w.workerId}>
                          <span className="headings">{w.workerId}</span>
                          <span className="headings">{w.workerName}</span>
                          {/* <span className="headings">{w.isBusyStatus ? "Busy" : "Free"}</span> */}
                          <span className="headings">{new Date(w.updatedAt).toLocaleDateString()} {new Date(w.updatedAt).toLocaleTimeString()}</span>
                          <span className="headings" onClick={() => handleDelete(w.workerId)}><button>Delete</button></span>
                        </div>
                      ))}
                  </div>
             </div> 
            : <></> 
        }
      </>
    )
}

export default Worker;