import contentType from "../../data/ContentTypeEnum";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const USERNAME = "USERNAME";


export const toggleSidebar = () => ({
    type: 'TOGGLE_SIDEBAR'
})

export const logIn = () => ({
    type: LOG_IN
})

export const logOut = () => ({
    type: LOG_OUT
})

export const usernameSubmit = payload => ({
    type: USERNAME,
    username: payload
})

export const selectContentPage = payload => ({
    type: payload
})