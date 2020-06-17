import { toggleLike } from "../actions";

const fakePosts = [
  {
    id: 1,
    userID: 1,
    username: "BOB_STAR_123",
    content: "Check out this new playlist by ChilledCow!",
    title: "Study Beats",
    type: "playlist",
    usersLiked: [2, 3, 4, 5, 6],
  },
  {
    id: 2,
    userID: 2,
    username: "M&M_STAN",
    content: "I Love Eminems new album!",
    title: "Music to Be Murdered By",
    type: "album",
    usersLiked: [1, 3, 4, 5],
  },
  {
    id: 3,
    userID: 3,
    username: "Jamster79",
    content: "just made a new playlist to work out too",
    title: "work time 23",
    type: "playlist",
    usersLiked: [4, 5, 6],
  },
  {
    id: 4,
    userID: 4,
    username: "ImAUser",
    content: "This is gonna be the summer jam of 2020",
    title: "It's Corona Time - Chumino",
    type: "song",
    usersLiked: [2, 3, 5, 6],
  },
];

const initialState = {
  activity: true,
  posts: fakePosts,
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default feed;
