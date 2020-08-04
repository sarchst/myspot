import { ADD_POSTS_TO_FEED } from "../actions/feedActions";
import {
  FILTER_MOST_LIKED,
  FILTER_MOST_COMMENTED,
  FILTER_NEW_TO_OLD,
  FILTER_OLD_TO_NEW,
} from "../actions/filterActions";

const initialState = {
  activity: true,
  posts: [],
  filter: "New To Old",
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS_TO_FEED:
      return {
        ...state,
        posts: action.payload,
      };
    case FILTER_NEW_TO_OLD:
      return {
        ...state,
        filter: "New To Old",
      };
    case FILTER_OLD_TO_NEW:
      return {
        ...state,
        filter: "Old To New",
      };
    case FILTER_MOST_LIKED:
      return {
        ...state,
        filter: "Most Liked",
      };
    case FILTER_MOST_COMMENTED:
      return {
        ...state,
        filter: "Most Commented",
      };
    default:
      return state;
  }
};

export default feed;
