import { logOut } from "./index";

export const SELECT_USER = "SELECT_USER";

export const fetchSelectedUser = (userID) => {
  return (dispatch) => {
    fetch(`/user/${userID}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        if (res.data) {
          dispatch(setSelectedUser(res.data));
        } else {
          dispatch(logOut());
        }
      })
      .catch((error) => {
        dispatch(logOut());
      });
  };
};

export const setSelectedUser = (userObject) => ({
  type: SELECT_USER,
  payload: userObject,
});
