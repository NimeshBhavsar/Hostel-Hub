import React from 'react';
import "./topbar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { setShowComponentAdmin } from '../../reducer_actions/Actions.jsx';

const Topbar = () => {
    const dispatch = useDispatch();
    const handleClickProfileIcon = () => {
        dispatch(setShowComponentAdmin("profile"));
    };
    return (
        <div className='topbarWrapper'>
            <span className='topbarTitle'>HostelHub</span>
            <AccountCircleIcon className='profileLogo' sx={{ fontSize: 50 }} onClick={handleClickProfileIcon} />
        </div>
    )
}

export default Topbar;