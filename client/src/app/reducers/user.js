import {
  SET_CURRENT_USER,
  SET_ACTIVE_USER,
  LOG_OUT,
} from "../actions/userActions";

// Current is for the person using MySpot and navigating the Appbar
// Active is for navigating and rendering the Sidebar
const initialState = {
  current: {
    id: "",
    username: "",
  },
  active: {
    id: "",
    username: "",
  },
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        current: {
          ...state.current,
          id: action.id,
          username: action.username,
        },
      };
    case SET_ACTIVE_USER:
      return {
        ...state,
        active: {
          ...state.active,
          id: action.id,
          username: action.username,
        },
      };
    case LOG_OUT:
      return {
        ...state,
        current: {
          ...state.current,
          id: "",
          username: "",
        },
        active: {
          ...state.active,
          id: "",
          username: "",
        },
      };
    default:
      return state;
  }
};

export default user;
