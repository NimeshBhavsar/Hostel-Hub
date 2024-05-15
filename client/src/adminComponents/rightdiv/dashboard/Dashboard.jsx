import { useEffect, useState } from "react";
import axios from "axios";
import CleaningCard from "../roomcleaning/cleaningEntry/CleaningCard";
import ComplaintCard from "../complaint/complaintEntry/ComplaintCard";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
    const toShow = props.show;

    return (
      <>
        { toShow 
            ? 
            <div className='dashboardwrapper'>
                 <h1 className='title'>Dashboard</h1>
                 
             </div> 
            : <></> }
      </>
    )
}

export default Dashboard;