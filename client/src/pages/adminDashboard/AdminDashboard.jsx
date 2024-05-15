import Topbar from '../../adminComponents/topbar/Topbar.jsx';
import "./adminDashboard.css";
import Navbar from '../../adminComponents/navbar/Navbar.jsx';
import RightDivision from '../../adminComponents/rightdiv/RightDivision.jsx';

const AdminDashboard = () => {

    return (
        <div className='main'>
            <Topbar />
            <div className='dashboardWrapper'>
                <Navbar />
                <RightDivision />
            </div>
        </div>


    );
};
export default AdminDashboard;