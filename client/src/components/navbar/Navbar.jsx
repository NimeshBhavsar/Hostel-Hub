import React from 'react'
import "./navbar.css"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
// import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LogOut, setShowComponent } from '../../reducer_actions/Actions.jsx';

const Navbar = () => {
   
    const dispatch = useDispatch();

    const handleClickDashboard = () => {
        dispatch(setShowComponent("dashboard"));
    }
    const handleClickRoomCleaning = () => {
        dispatch(setShowComponent("cleaning"));
    }
    const handleClickComplaint = () => {
        dispatch(setShowComponent("complaint"));
    }
    const handleLogOut = () => {
        localStorage.setItem("user", null);
        dispatch(LogOut());
    }

    return (
        <div className='leftdivision'>
            <ul>

                <li className='listItem_leftdiv' onClick={handleClickDashboard} >
                    <DashboardIcon className='logoimage' />
                    <span className='listItemName'>Dashboard</span>
                </li>
                <li className='listItem_leftdiv' onClick={handleClickRoomCleaning}>
                    <CleaningServicesIcon className='logoimage' />
                    <span className='listItemName'>Room Cleaning</span>
                </li>
                <li className='listItem_leftdiv' onClick={handleClickComplaint}>
                    <RateReviewIcon className='logoimage' />
                    <span className='listItemName'>Complaint</span>
                </li>
                {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
                <li className='listItem_leftdiv'>
                    <LogoutIcon className='logoimage' />
                    <span className='listItemName' onClick={handleLogOut}>Logout</span>
                </li>
                {/* </Link> */}
            </ul>

        </div>
    )
}

export default Navbar;

