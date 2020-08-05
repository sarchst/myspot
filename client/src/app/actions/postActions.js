import axios from "axios";

import { applyFilter } from "./filterActions";
import { fetchFeedWithFilter } from "./feedActions";

export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";
export const ADD_POSTS_TO_POSTS = "ADD_POSTS_TO_POSTS";
export const MAKE_POST_SUCCESS = "MAKE_POST_SUCCESS";

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

export const makePost = (post, profileFeedFilter, feedFilter) => {
  const id = post.authorId;
  return (dispatch) => {
    return axios
      .put(`/user/posts/${id}`, post)

      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deletePost = (id, postId, profileFeedFilter, feedFilter) => {
  return (dispatch) => {
    return axios
      .put(`/user/posts/delete/${id}`, postId)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export function fetchPostsWithFilter(id, profileFeedFilter) {
  return (dispatch) => {
    dispatch(fetchPostsStarted());
    fetch(`/user/posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchPostsSuccess());
        return res.data;
      })
      .then((res) => {
        for (let i = 0; i < res.posts.length; i++) {
          res.posts[i].profilePic = res.profilePic;
        }

        let sortedPosts = applyFilter(res.posts, profileFeedFilter);

        dispatch(addPostsToPosts(sortedPosts));
        return res;
      })
      .catch((error) => {
        console.error("Fetch Posts Error: ", error);
      });
  };
}

export const addComment = (comment, profileFeedFilter, feedFilter) => {
  let id = comment.postOwnerId;
  let userId = comment.authorId;
  return (dispatch) => {
    return axios
      .put(`/user/posts/comments/${id}`, comment)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(userId, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteComment = (id, body, profileFeedFilter, feedFilter) => {
  let userId = body.authorId;
  let commentInfo = body.commentInfo;
  return (dispatch) => {
    return axios
      .put(`/user/posts/comments/delete/${id}`, commentInfo)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(userId, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editPost = (id, commentInfo, profileFeedFilter, feedFilter) => {
  return (dispatch) => {
    return axios
      .put(`/user/posts/edit/${id}`, commentInfo)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const toggleLike = (post, id, profileFeedFilter, feedFilter) => {
  let postInfo = { postId: post._id, userId: id };
  let toggle = "like";
  if (post.usersLiked.includes(id)) {
    toggle = "unlike";
  }
  return (dispatch) => {
    return axios
      .put(`/user/posts/${toggle}/${post.authorId}`, postInfo)
      .then(() => {
        dispatch(fetchPostsWithFilter(post.authorId, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
