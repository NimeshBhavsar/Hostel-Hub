import { useEffect } from 'react';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import AdminDashboard from './pages/adminDashboard/AdminDashboard.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';

const App = () => {
  const loggedInUserData = useSelector((state) => {
    return state.Reducers.user;
  });
  const loggedInAdminData = useSelector((state) => {
    return state.Reducers.admin;
  });

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(loggedInUserData));
  }, [loggedInUserData]);

  useEffect(()=>{
    localStorage.setItem("admin", JSON.stringify(loggedInAdminData));
  }, [loggedInAdminData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={loggedInAdminData ? <AdminDashboard /> : loggedInUserData ? <DashboardPage /> : <LoginPage />} />
        <Route exact path="/student" element={loggedInUserData ? <DashboardPage /> : <LoginPage />} />
        <Route path="/login" element={loggedInUserData ? <Navigate to="/student" /> : <LoginPage />} />
        <Route path="/dashboard" element={loggedInUserData ? <DashboardPage /> : <LoginPage />} />
        <Route exact path="/admin" element={loggedInAdminData ? <AdminDashboard /> : <LoginPage />} />
        <Route path="/adminlogin" element={loggedInAdminData ? <Navigate to="/admin" /> : <LoginPage />} />      
        <Route path="/admindashboard" element={loggedInAdminData ? <AdminDashboard /> : <LoginPage />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

