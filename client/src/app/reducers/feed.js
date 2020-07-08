import { TOGGLE_LIKE, ADD_POSTS_TO_FEED } from "../actions/feedActions";

// const fakePosts = [
//   {
//     id: 1,
//     userID: 1,
//     username: "BOB_STAR_123",
//     content: "Check out this new playlist by ChilledCow!",
//     title: "Study Beats",
//     type: "playlist",
//     usersLiked: new Set([2, 3, 4, 5, 6]),
//   },
//   {
//     id: 2,
//     userID: 2,
//     username: "M&M_STAN",
//     content: "I Love Eminems new album!",
//     title: "Music to Be Murdered By",
//     type: "album",
//     usersLiked: new Set([1, 3, 4, 5]),
//   },
//   {
//     id: 3,
//     userID: 3,
//     username: "Jamster79",
//     content: "just made a new playlist to work out too",
//     title: "work time 23",
//     type: "playlist",
//     usersLiked: new Set([4, 5, 6]),
//   },
//   {
//     id: 4,
//     userID: 4,
//     username: "ImAUser",
//     content: "This is gonna be the summer jam of 2020",
//     title: "It's Corona Time - Chumino",
//     type: "song",
//     usersLiked: new Set([2, 3, 5, 6]),
//   },
// ];

const initialState = {
  activity: true,
  posts: [],
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      let newUsersLiked = [...action.payload.usersLiked];
      if (action.payload.usersLiked.includes(action.payload.userId)) {
        newUsersLiked = newUsersLiked.filter(
          (u) => u !== action.payload.userId
        );
      } else {
        newUsersLiked.push(action.payload.userId);
      }
      return {
        ...state,
        // I don't like this, could take a long time if we have a lot of posts
        posts: state.posts.map((post) =>
          post.id === action.payload.post.id
            ? { ...post, usersLiked: newUsersLiked }
            : post
        ),
      };
    case ADD_POSTS_TO_FEED:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default feed;
