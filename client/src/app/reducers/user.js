import { SET_CURRENT_USER, LOG_OUT } from "../actions/userActions";

const initialState = {
  id: "",
  username: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        id: action.id,
        username: action.username,
      };
    case LOG_OUT:
      return {
        ...state,
        id: "",
        username: "",
      };
    default:
      return state;
  }
};

export default user;
