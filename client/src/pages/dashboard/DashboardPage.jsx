import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar.jsx';
import "./dashboardpage.css";
import Navbar from '../../components/navbar/Navbar.jsx';
import RightDivision from '../../components/rightdiv/RightDivision.jsx';

const DashboardPage = () => {

    return (
        <div className='mainPage'>
            <Topbar />
            <div className='dashboardWrapper'>
                <Navbar />
                <RightDivision />
            </div>
        </div>


    );
};
export default DashboardPage;