import { combineReducers } from 'redux';

import toggleSidebar from './toggleSidebar';
import isLoggedIn from "./isLoggedIn";
import username from "./username";

const allReducers = combineReducers({
    isSidebarOpen: toggleSidebar,
    isLoggedIn: isLoggedIn,
    username: username
})

export default allReducers;
