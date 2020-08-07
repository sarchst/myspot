import { SELECT_USER } from "../actions/selectedUserActions";
import { LOG_OUT } from "../actions";

const initialState = {
  followers: [],
};

export const selectedUser = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.payload;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default selectedUser;
