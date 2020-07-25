export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR";

export const searchUserSuccess = (user) => ({
  type: SEARCH_USER_SUCCESS,
  payload: user,
});

export const searchUserError = (err) => ({
  type: SEARCH_USER_ERROR,
  payload: err,
});

export const searchUserByID = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:9000/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(searchUserSuccess(res));
      })
      .catch((err) => {
        dispatch(searchUserError(err));
      });
  };
};
