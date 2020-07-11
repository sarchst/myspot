import axios from "axios";

export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";
export const ADD_POSTS_TO_POSTS = "ADD_POSTS_TO_POSTS";
export const MAKE_POST_SUCCESS = "MAKE_POST_SUCCESS";

export const makePost = (post) => {
  // TODO make the id component post.username once we have a spotify user in database, setting it to mikayla for now to match other temp username values
  console.log("Post from actions: ", post);
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/mikayla`, post)
      .then((res) => {
        console.log("Res: ", res);
        dispatch(makePostSuccess(res.data.posts));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const makePostSuccess = (posts) => ({
  type: MAKE_POST_SUCCESS,
  payload: posts,
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
