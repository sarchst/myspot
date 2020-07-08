export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const MAKE_POST = "MAKE_POST";

export const toggleLike = (payload) => ({
  type: TOGGLE_LIKE,
  payload,
});

let postId = 1;
export const makePost = (post) => {
  // TODO add axios function to make call to API/DB
  makePostSuccess(post);
};

export const makePostSuccess = (post) => ({
  type: MAKE_POST,
  payload: post,
});
