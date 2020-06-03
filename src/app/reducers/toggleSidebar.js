const initialState = true;

export const isSidebarOpenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            const temp = !state;
            return temp;
        default:
            return state;
    }

}

export default isSidebarOpenReducer;