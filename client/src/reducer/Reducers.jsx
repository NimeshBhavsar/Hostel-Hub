
const initialData = {
    showComponents : [
        {id: "dashboard", show: true},
        {id: "cleaning", show: false},
        {id: "complaint", show: false},
        {id: "profile", show: false},

    ],
    showComponentsAdmin : [
        {id: "dashboard", show: false},
        {id: "cleaning", show: false},
        {id: "complaint", show: false},
        {id: "profile", show: true},
        {id: "worker", show: false},

    ],
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    admin:JSON.parse(localStorage.getItem("admin")) || null,
    isFetchingAdmin: false,
    errorAdmin: false,

}

const Reducers = (state=initialData, action) => {
    switch(action.type) {
        case "SET_COMPONENT":
            return {
                ...state,
                showComponents: state.showComponents.map(component => {
                    if(component.id !== action.payload.id){
                        return {
                            ...component,
                            show: false
                        }
                    }
                    return {
                        ...component,
                        show: true
                    }
                })
            }
        case "ADMIN_SET_COMPONENT":
            return {
                ...state,
                showComponentsAdmin: state.showComponentsAdmin.map(component => {
                    if(component.id !== action.payload.id){
                        return {
                            ...component,
                            show: false
                        }
                    }
                    return {
                        ...component,
                        show: true
                    }
                })
            }
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            }
        case "ADMIN_LOGIN_START":
            return {
                ...state,
                admin: null,
                isFetchingAdmin: true,
                errorAdmin: false,
            }
        case "ADMIN_LOGIN_SUCCESS":
            return {
                ...state,
                admin: action.payload,
                isFetchingAdmin: false,
                errorAdmin: false,
            }
        case "ADMIN_LOGIN_FAILURE":
            return {
                ...state,
                admin: null,
                isFetchingAdmin: false,
                errorAdmin: true,
            }
        case "ADMIN_LOGOUT":
            return {
                ...state,
                admin: null,
                isFetchingAdmin: false,
                errorAdmin: false,
            }
        default:
            return state;
    }

};

export default Reducers;