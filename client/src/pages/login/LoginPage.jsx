import "./login.css";
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure, LoginStartAdmin, LoginSuccessAdmin, LoginFailureAdmin } from '../../reducer_actions/Actions.jsx';
import { CircularProgress } from "@material-ui/core";


const LoginPage = () => {

  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginSelector = () => {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true);
  };
  
  const studentEmail = useRef();
  const studentPassword = useRef();
  const adminEmail = useRef();
  const adminPassword = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => {
    return state.Reducers.isFetching;
  });

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await axios.post("/api/auth/login", { studentEmail: studentEmail.current.value, password: studentPassword.current.value });
      dispatch(LoginSuccess(
        {
          studentName: res.data.studentName,
          studentEmail: res.data.studentEmail, 
          studentRegNo: res.data.studentRegNo, 
          room_number: res.data.room_number, 
          studentPhone_no: res.data.studentPhone_no, 
          hostelBlockName: res.data.hostelBlockName, 
          hostelFloorNo: res.data.hostelFloorNo
        }));
    } catch (err) {
     dispatch(LoginFailure());
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    dispatch(LoginStartAdmin());
    try {
      const res = await axios.post("/api/auth/admin/login", { adminEmail: adminEmail.current.value, password: adminPassword.current.value });
      dispatch(LoginSuccessAdmin(
        {
          adminName: res.data.adminName,
          adminId: res.data.adminId, 
          adminEmail: res.data.adminEmail, 
          adminPhone_no: res.data.adminPhone_no, 
          hostelBlockName: res.data.hostelBlockName
        }));
    } catch (err) {
     dispatch(LoginFailureAdmin());
    }
  };

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="leftDiv">
          <img src="assets/landingPageImage.png" alt="" className="leftImg" />
        </div>
        <div className="rightDiv">

          <div className="loginform">
            <h1 id="loginformtitle">Hostel Hub</h1>
            {
              isAdmin 
              ? 
              <form onSubmit={handleSubmitAdmin}>
                <h3 className="loginSelector">
                  <span className="studSelector" onClick={handleLoginSelector}>Student</span>
                  &nbsp;&nbsp;
                  <span>Admin</span>
                </h3>
                <label className="loginformlabel">Username</label>
                <input
                  type="email" 
                  className="loginforminput" 
                  placeholder="Enter your admin-email as username"
                  required
                  autoComplete="true"
                  ref={adminEmail}
                />

                <br /><br />
                <label className="loginformlabel">Password</label>
                <input 
                  type="password" 
                  className="loginforminput" 
                  placeholder="Enter your AdminId as password"
                  minLength="8"
                  autoComplete="true"
                  required
                  ref={adminPassword}
                />

                <br /><br />

                  <button type="submit" id="submitbutton">
                    {isFetching ? ( <CircularProgress color="inherit" size="30px"/> ) : ( "Login" )}
                  </button>
              </form>  
              : 
              <form onSubmit={handleSubmitStudent}>
                <h3 className="loginSelector">
                  <span>Student</span>
                  &nbsp;&nbsp;
                  <span className="adminSelector" onClick={handleLoginSelector}>Admin</span>
                </h3>
                <label className="loginformlabel">Username</label>
                <input 
                  type="email" 
                  className="loginforminput" 
                  placeholder="Enter your vit-email as username"
                  required
                  autoComplete="true"
                  ref={studentEmail}
                />

                <br /><br />
                <label className="loginformlabel">Password</label>
                <input 
                  type="password" 
                  className="loginforminput" 
                  placeholder="Enter your Reg. No. as password"
                  minLength="8"
                  autoComplete="true"
                  required
                  ref={studentPassword}
                />

                <br /><br />

                  <button type="submit" id="submitbutton">
                    {isFetching ? ( <CircularProgress color="inherit" size="30px"/> ) : ( "Login" )}
                  </button>
              </form> 
            }
            

          </div>
        </div>

      </div>

    </div>

  );
};
export default LoginPage;