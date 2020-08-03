import { SET_CURRENT_USER } from "../actions/userActions";
import { FETCH_PROFILEPIC_SUCCESS } from "../actions/imageUploadActions";
import { LOG_OUT } from "../actions";

const initialState = {
  id: "",
  username: "",
  profilePic: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
        id: action.payload._id,
        username: action.payload.username,
      };
    case LOG_OUT:
      return initialState;
    case FETCH_PROFILEPIC_SUCCESS:
      return {
        ...state,
        profilePic: action.payload,
      };
    default:
      return state;
  }
};

export default user;
