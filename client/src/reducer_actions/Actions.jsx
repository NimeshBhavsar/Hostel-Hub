const setShowComponent = (inputData) => {
    return {
        type: "SET_COMPONENT",
        payload: {
            id: inputData
        }
    }
};

const setShowComponentAdmin = (inputData) => {
    return {
        type: "ADMIN_SET_COMPONENT",
        payload: {
            id: inputData
        }
    }
};

const LoginStart = () => ({
    type: "LOGIN_START"
});
  
const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
  
const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});

const LogOut = () => ({
    type: "LOGOUT"
});

const LoginStartAdmin = () => ({
    type: "ADMIN_LOGIN_START"
});
  
const LoginSuccessAdmin = (admin) => ({
    type: "ADMIN_LOGIN_SUCCESS",
    payload: admin,
});
  
const LoginFailureAdmin = () => ({
    type: "ADMIN_LOGIN_FAILURE"
});

const LogOutAdmin = () => ({
    type: "ADMIN_LOGOUT"
});

export {setShowComponent, setShowComponentAdmin, LoginStart, LoginSuccess, LoginFailure, LogOut , LoginStartAdmin, LoginSuccessAdmin, LoginFailureAdmin, LogOutAdmin};