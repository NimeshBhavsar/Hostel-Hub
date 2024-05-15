import React from 'react';
import './rightdivision.css';
import Dashboard from './dashboard/Dashboard.jsx';
import Roomcleaning from './roomcleaning/Roomcleaning.jsx';
import Complaint from './complaint/Complaint.jsx';
import Profile from './profile/Profile.jsx';
import { useSelector } from 'react-redux';
import Worker from './worker/Worker.jsx';

const RightDivision = () => {
    const showComponentsAdmin = useSelector((state) => {
        return state.Reducers.showComponentsAdmin;
    });
    return (
        <div className='rightdivision'>
            {/* <Dashboard key={1} show={showComponentsAdmin[0].show}/> */}
            <Roomcleaning key={2} show={showComponentsAdmin[1].show}/>
            <Complaint key={3} show={showComponentsAdmin[2].show}/>
            <Profile key={4} show={showComponentsAdmin[3].show}/>
            <Worker key={5} show={showComponentsAdmin[4].show}/>
        </div>
    )
}

export default RightDivision;