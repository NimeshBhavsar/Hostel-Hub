import { createStore } from "redux";
import { combineReducers } from "redux";
import Reducers from "./reducer/Reducers";

const rootReducer = combineReducers({
    Reducers
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export {store};