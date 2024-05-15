import React from 'react';
import "./navbar.css";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LogOutAdmin, setShowComponentAdmin } from '../../reducer_actions/Actions.jsx';

const Navbar = () => {
   
    const dispatch = useDispatch();

    const handleClickDashboard = () => {
        dispatch(setShowComponentAdmin("dashboard"));
    }
    const handleClickRoomCleaning = () => {
        dispatch(setShowComponentAdmin("cleaning"));
    }
    const handleClickComplaint = () => {
        dispatch(setShowComponentAdmin("complaint"));
    }
    const handleClickWorker = () => {
        dispatch(setShowComponentAdmin("worker"));
    }
    
    const handleLogOut = () => {
        localStorage.setItem("admin", null);
        dispatch(LogOutAdmin());
    }

    return (
        <div className='leftdivision'>
            <ul>

                {/* <li className='listItem_leftdiv' onClick={handleClickDashboard} >
                    <DashboardIcon className='logoimage' />
                    <span className='listItemName'>Dashboard</span>
                </li> */}
                <li className='listItem_leftdiv' onClick={handleClickRoomCleaning}>
                    <CleaningServicesIcon className='logoimage' />
                    <span className='listItemName'>Room Cleaning</span>
                </li>
                <li className='listItem_leftdiv' onClick={handleClickComplaint}>
                    <RateReviewIcon className='logoimage' />
                    <span className='listItemName'>Complaint</span>
                </li>
                <li className='listItem_leftdiv' onClick={handleClickWorker}>
                    <ManageAccountsIcon className='logoimage' />
                    <span className='listItemName'>Workers</span>
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

