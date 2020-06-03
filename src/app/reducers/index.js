import { combineReducers } from 'redux';

import toggleSidebar from './toggleSidebar';

const allReducers = combineReducers({
    isSidebarOpen: toggleSidebar
})

export default allReducers;
