import { SEARCH_USER_SUCCESS } from "../actions/searchActions";

const initialState = "";

export const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_SUCCESS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default searchResults;
