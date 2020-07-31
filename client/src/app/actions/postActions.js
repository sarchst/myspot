import axios from "axios";
import { fetchFeedWithFilter } from "./feedActions";
import { applyFilter } from "./filterActions";

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

// export const makePost = (post) => {
//   console.log("Post from actions: ", post);
//   const id = post.authorId;
//   return (dispatch) => {
//     return axios
//       .put(`http://localhost:9000/user/posts/${id}`, post)

//       .then(() => {
//         dispatch(fetchPosts(id));
//       })
//       .then(() => {
//         dispatch(fetchFeed(id));
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };
// };

export const makePost = (post, profileFeedFilter, feedFilter) => {
  console.log("Post from actions: ", post);
  const id = post.authorId;
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/${id}`, post)

      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deletePost = (id, postId, profileFeedFilter, feedFilter) => {
  console.log("Delete post in actions user ID", id);
  console.log("Delete post in postBody", postId);
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/delete/${id}`, postId)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        throw error;
      });
  };
};
// export function fetchPosts(id) {
//   return (dispatch) => {
//     dispatch(fetchPostsStarted());
//     fetch(`http://localhost:9000/user/posts/${id}`)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           throw res.error;
//         }
//         // console.log("fetchPosts method:");
//         dispatch(fetchPostsSuccess());
//         return res.data;
//       })
//       .then((res) => {
//         for (let i = 0; i < res.posts.length; i++) {
//           res.posts[i].profilePic = res.profilePic;
//         }

//         const sortedPosts = res.posts.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         dispatch(addPostsToPosts(sortedPosts));
//         return res;
//       })
//       .catch((error) => {
//         console.log("Fetch Posts Error");
//         dispatch(fetchPostsError(error));
//       });
//   };
// }

export function fetchPostsWithFilter(id, profileFeedFilter) {
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
        for (let i = 0; i < res.posts.length; i++) {
          res.posts[i].profilePic = res.profilePic;
        }

        // const sortedPosts = res.posts.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );
        let sortedPosts = applyFilter(res.posts, profileFeedFilter);

        dispatch(addPostsToPosts(sortedPosts));
        return res;
      })
      .catch((error) => {
        console.log("Fetch Posts Error");
        dispatch(fetchPostsError(error));
      });
  };
}

export const addComment = (comment, profileFeedFilter, feedFilter) => {
  let id = comment.postOwnerId;
  let authorId = comment.authorId;
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/comments/${id}`, comment)
      .then(() => {
        dispatch(fetchPostsWithFilter(authorId, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(authorId, feedFilter));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteComment = (id, body, profileFeedFilter, feedFilter) => {
  let authorId = body.authorId;
  let commentInfo = body.commentInfo;
  return (dispatch) => {
    return axios
      .put(
        `http://localhost:9000/user/posts/comments/delete/${id}`,
        commentInfo
      )
      .then(() => {
        dispatch(fetchPostsWithFilter(authorId, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(authorId, feedFilter));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const editPost = (id, commentInfo, profileFeedFilter, feedFilter) => {
  console.log("edit post action");
  return (dispatch) => {
    return axios
      .put(`http://localhost:9000/user/posts/edit/${id}`, commentInfo)
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        throw error;
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
      .put(
        `http://localhost:9000/user/posts/${toggle}/${post.authorId}`,
        postInfo
      )
      .then(() => {
        dispatch(fetchPostsWithFilter(id, profileFeedFilter));
      })
      .then(() => {
        dispatch(fetchFeedWithFilter(id, feedFilter));
      })
      .catch((error) => {
        throw error;
      });
  };
};