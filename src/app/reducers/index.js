import { combineReducers } from 'redux';

import toggleSidebar from './toggleSidebar';
import isLoggedIn from "./isLoggedIn";

const allReducers = combineReducers({
    isSidebarOpen: toggleSidebar,
    isLoggedIn: isLoggedIn
})

export default allReducers;
