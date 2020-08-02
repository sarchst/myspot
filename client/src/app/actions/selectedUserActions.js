export const SELECT_USER = "SELECT_USER";

export const fetchSelectedUser = (userID) => {
  return (dispatch) => {
    fetch(`http://localhost:9000/user/${userID}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(setSelectedUserThunk(res.data));
      })
      .catch((error) => {
        console.log("error fetching db user", error);
      });
  };
};

export const setSelectedUserThunk = (userObject) => ({
  type: SELECT_USER,
  payload: userObject,
});
