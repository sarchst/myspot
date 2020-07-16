export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const FETCH_FEED_SUCCESS = "FETCH_FEED_SUCCESS";
export const FETCH_FEED_ERROR = "FETCH_FEED_ERROR";
export const FETCH_FEED_STARTED = "FETCH_FEED_STARTED";
export const ADD_POSTS_TO_FEED = "ADD_POSTS_TO_FEED";
export const COMBINE_P_POSTS_WITH_FEED = "COMBINE_P_POSTS_WITH_FEED";

export const toggleLike = (payload) => ({
  type: TOGGLE_LIKE,
  payload,
});

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
        const feed = [].concat(res[0].posts, res[0].following[0].posts);

        const sortedFeed = feed.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        dispatch(addPostsToFeed(sortedFeed));
        return res;
      })
      .catch((error) => {
        dispatch(fetchFeedError(error));
      });
  };
}
