import { SET_CURRENT_USER, LOG_OUT } from "../actions/userActions";
import { FETCH_PROFILEPIC_SUCCESS } from "../actions/imageUploadActions";

const initialState = {
  id: "",
  username: "",
  profilePic:
    "https://res.cloudinary.com/dafyfaoby/image/upload/v1595033507/samples/sheep.jpg",
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
