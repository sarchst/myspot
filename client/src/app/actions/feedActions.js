import { applyFilter } from "./filterActions";

export const FETCH_FEED_SUCCESS = "FETCH_FEED_SUCCESS";
export const FETCH_FEED_ERROR = "FETCH_FEED_ERROR";
export const FETCH_FEED_STARTED = "FETCH_FEED_STARTED";
export const ADD_POSTS_TO_FEED = "ADD_POSTS_TO_FEED";
export const COMBINE_P_POSTS_WITH_FEED = "COMBINE_P_POSTS_WITH_FEED";
export const FILTER_NEW_TO_OLD = "FILTER_NEW_TO_OLD";
export const FILTER_OLD_TO_NEW = "FILTER_OLD_TO_NEW";
export const FILTER_MOST_LIKED = "FILTER_MOST_LIKED";
export const FILTER_MOST_COMMENTED = "FILTER_MOST_COMMENTED";

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

export function fetchFeedWithFilter(id, filter) {
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
        let followerSet = {};
        let numFollowing = res[0].following.length;
        followerSet[res[0]._id] = res[0].profilePic;
        for (let i = 0; i < numFollowing; i++) {
          followerSet[res[0].following[i]._id] = res[0].following[i].profilePic;
        }

        let feed = res[0].posts;
        for (let i = 0; i < numFollowing; i++) {
          feed = feed.concat(res[0].following[i].posts);
        }

        for (let i = 0; i < feed.length; i++) {
          feed[i].profilePic = followerSet[feed[i].authorId];
        }

        let sortedFeed = applyFilter(feed, filter);

        dispatch(addPostsToFeed(sortedFeed));
        return res;
      })
      .catch((error) => {
        dispatch(fetchFeedError(error));
      });
  };
}
