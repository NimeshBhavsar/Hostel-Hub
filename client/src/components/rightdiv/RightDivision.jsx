import React from 'react';
import './rightdivision.css';
import Dashboard from './dashboard/Dashboard.jsx';
import Roomcleaning from './roomcleaning/Roomcleaning.jsx';
import Complaint from './complaint/Complaint.jsx';
import Profile from './profile/Profile.jsx';
import { useSelector } from 'react-redux';

const RightDivision = () => {
    const showComponents = useSelector((state) => {
        return state.Reducers.showComponents;
    });
    return (
        <div className='rightdivision'>
            <Dashboard key={1} show={showComponents[0].show}/>
            <Roomcleaning key={2} show={showComponents[1].show}/>
            <Complaint key={3} show={showComponents[2].show}/>
            <Profile key={4} show={showComponents[3].show}/>
        </div>
    )
}

export default RightDivision;