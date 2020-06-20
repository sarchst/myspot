import { TOGGLE_LIKE } from "../actions/feedActions";

const fakePosts = [
  {
    id: 1,
    userID: 1,
    username: "BOB_STAR_123",
    content: "Check out this new playlist by ChilledCow!",
    title: "Study Beats",
    type: "playlist",
    usersLiked: new Set([2, 3, 4, 5, 6]),
  },
  {
    id: 2,
    userID: 2,
    username: "M&M_STAN",
    content: "I Love Eminems new album!",
    title: "Music to Be Murdered By",
    type: "album",
    usersLiked: new Set([1, 3, 4, 5]),
  },
  {
    id: 3,
    userID: 3,
    username: "Jamster79",
    content: "just made a new playlist to work out too",
    title: "work time 23",
    type: "playlist",
    usersLiked: new Set([4, 5, 6]),
  },
  {
    id: 4,
    userID: 4,
    username: "ImAUser",
    content: "This is gonna be the summer jam of 2020",
    title: "It's Corona Time - Chumino",
    type: "song",
    usersLiked: new Set([2, 3, 5, 6]),
  },
];

const initialState = {
  activity: true,
  posts: fakePosts,
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      let newSet;
      if (action.payload.post.usersLiked.has(action.payload.userId)) {
        action.payload.post.usersLiked.delete(action.payload.userId);
        newSet = action.payload.post.usersLiked;
      } else {
        newSet = action.payload.post.usersLiked.add(action.payload.userId);
      }
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post.id
            ? { ...post, usersLiked: newSet }
            : post
        ),
      };
    default:
      return state;
  }
};

export default feed;
