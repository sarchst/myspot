import {
  FETCH_FEED_STARTED,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_ERROR,
} from "../actions/feedActions";

const initialState = {
  pending: false,
  error: null,
};

export const fetchFeed = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_STARTED:
      return {
        ...state,
        pending: true,
      };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case FETCH_FEED_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default fetchFeed;
