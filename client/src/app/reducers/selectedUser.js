import { SELECT_USER } from "../actions/selectedUserActions";

const initialState = {};

export const selectedUser = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default selectedUser;
