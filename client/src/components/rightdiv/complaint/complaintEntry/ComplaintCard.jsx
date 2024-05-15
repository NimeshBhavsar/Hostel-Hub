
const ComplaintCard = (props) => {
  const complaint = props.complaint;


    return (
      <>
       { 
       <div className="tableHead">
        
          <span className="headings">{complaint.studentRegNo}</span>
      
          {/* <span className="headings">{complaint.room_number}</span> */}
    
          <span className="studentComments">{complaint.studentComments ? complaint.studentComments : "--" }</span>
      
          <span className="headings">{complaint.isResolvedStatus ? "true" : "false"}</span>

          <span className="headings">{new Date(complaint.createdAt).toLocaleDateString()} {new Date(complaint.createdAt).toLocaleTimeString()}</span>


      </div>
      } 
      </>
    )
}

export default ComplaintCard;


