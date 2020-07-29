import axios from "axios";
import { fetchPosts } from "./postActions";

// export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const FETCH_FEED_SUCCESS = "FETCH_FEED_SUCCESS";
export const FETCH_FEED_ERROR = "FETCH_FEED_ERROR";
export const FETCH_FEED_STARTED = "FETCH_FEED_STARTED";
export const ADD_POSTS_TO_FEED = "ADD_POSTS_TO_FEED";
export const COMBINE_P_POSTS_WITH_FEED = "COMBINE_P_POSTS_WITH_FEED";


// export const toggleLike = (payload) => ({
//   type: TOGGLE_LIKE,
//   payload,
// });

export function fetchFeedStarted() {
  return {
    type: FETCH_FEED_STARTED,
  };
}

export function fetchFeedSuccess() {
  return {
    type: FETCH_FEED_SUCCESS,
  };
}

export function fetchFeedError(error) {
  return {
    type: FETCH_FEED_ERROR,
    error: error,
  };
}

export function addPostsToFeed(data) {
  return {
    type: ADD_POSTS_TO_FEED,
    payload: data,
  };
}

export const toggleLike = (post, id) => {
  let postInfo = { postId: post._id, userId: id };
  let toggle = "like";
  if (post.usersLiked.includes(id)) {
    toggle = "unlike";
  }
  return (dispatch) => {
    return axios
      .put(
        `http://localhost:9000/user/posts/${toggle}/${post.authorId}`,
        postInfo
      )
      .then(() => {
        dispatch(fetchPosts(id));
      })
      .then(() => {
        dispatch(fetchFeed(id));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export function fetchFeed(id) {
  return (dispatch) => {
    dispatch(fetchFeedStarted());
    fetch(`http://localhost:9000/user/feed/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchFeedSuccess());
        return res.data;
      })
      .then((res) => {
        // create follower set object with _id : profilePic

        let followerSet = {};
        let numFollowing = res[0].following.length;
        followerSet[res[0]._id] = res[0].profilePic;
        for (let i = 0; i < numFollowing; i++) {
          followerSet[res[0].following[i]._id] = res[0].following[i].profilePic;
        }

        // console.log(followerSet);

        // // console.log(numFollowing);
        let feed = res[0].posts;
        for (let i = 0; i < numFollowing; i++) {
          feed = feed.concat(res[0].following[i].posts);
        }
        // console.log(feed);

        // add profilePic info to each feed
        for (let i = 0; i < feed.length; i++) {
          feed[i].profilePic = followerSet[feed[i].authorId];
        }

        // console.log(feed);

        const sortedFeed = feed.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // console.log(sortedFeed);
        dispatch(addPostsToFeed(sortedFeed));
        // console.log("fetch feed finished");
        return res;
      })
      .catch((error) => {
        dispatch(fetchFeedError(error));
      });
  };
}
