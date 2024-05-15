import { useState } from "react";
import axios from "axios";

const CleaningCard = (props) => {
    const cleaningreq = props.cleaningreq;
    const [otp, setotp] = useState("");
    const [newW, setNewW] = useState(false);


    const checkOTP = async (event) => {
        event.preventDefault();

        if(cleaningreq.otp == otp) {
          console.log("correct otp");
          await axios.patch("/api/cleaningreq/"+cleaningreq.cleaningreqId,
            {
              isCompletedStatus: "true",
              isStudent: true
            }
          );
          setNewW(true);
          alert("OTP Verified Successfully 😊\n\nRoom Cleaning Completed.");

        } else {
          alert("Incorrect OTP 🙁\n\nVerification Failed.");

        }
    }

    return (
      <>
       { 
       <div className="tableHead">
        
          <span className="headings">{cleaningreq.studentRegNo}</span>
      
          {/* <span className="headings">{cleaningreq.room_number}</span> */}
    
          <span className="studentComments">{cleaningreq.studentComments ? cleaningreq.studentComments : "-"}</span>
        
         {/* !newW ? <span className="headings">{!newW ? "true": "false"}</span>:<></> */}
          <span className="headings">{cleaningreq.isCompletedStatus ? "true" : newW ? "true": "false" }</span>

          {/* <span className="headings">{cleaningreq.updatedAt.slice(0, 10)+" "+cleaningreq.updatedAt.slice(11, 13)}</span> */}
          <span className="headings">{new Date(cleaningreq.createdAt).toLocaleDateString()} {new Date(cleaningreq.createdAt).toLocaleTimeString()}</span>

          <span className="headings">{cleaningreq.isCompletedStatus ? "" : 
          !newW ? <form onSubmit={checkOTP}>
          <input type="text" size="6" placeholder="Enter OTP" required value={otp} onChange={(e) => setotp(e.target.value)}/> 
          <button type="submit">Submit</button>
        </form> : <></>
           }
          </span>

        </div>
      } 
      </>
    )
}

export default CleaningCard;