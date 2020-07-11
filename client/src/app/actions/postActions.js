import axios from "axios";

export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";
export const ADD_POSTS_TO_POSTS = "ADD_POSTS_TO_POSTS";
export const MAKE_POST_SUCCESS = "MAKE_POST_SUCCESS";

export const makePost = (post) => {
  // TODO add axios function to make call to API/DB
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/${post._id}`, post)
      .then((res) => {
        dispatch(makePostSuccess(res));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const makePostSuccess = (post) => ({
  type: MAKE_POST_SUCCESS,
  payload: post,
});

export function fetchPostsStarted() {
  return {
    type: FETCH_POSTS_STARTED,
  };
}

export function fetchPostsSuccess() {
  return {
    type: FETCH_POSTS_SUCCESS,
  };
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    error: error,
  };
}

export function addPostsToPosts(data) {
  return {
    type: ADD_POSTS_TO_POSTS,
    payload: data,
  };
}

export function fetchPosts(id) {
  return (dispatch) => {
    dispatch(fetchPostsStarted());
    fetch(`http://localhost:9000/user/posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        // console.log("fetchPosts method:");
        dispatch(fetchPostsSuccess());
        return res.data;
      })
      .then((res) => {
        // console.log("POSTS to be loaded:");
        // console.log(res);
        dispatch(addPostsToPosts(res));
        return res;
      })
      .catch((error) => {
        // console.log("Fetch Posts Error");
        dispatch(fetchPostsError(error));
      });
  };
}