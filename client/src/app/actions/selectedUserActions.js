export const SELECT_USER = "SELECT_USER";

export const setSelectedUser = (userID) => {
  console.log("setSelectedUser in actions called");
  return (dispatch) => {
    console.log("inside selecteduser dispatch");
    fetch(`http://localhost:9000/user/${userID}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          throw res.error;
        }
        console.log("res.data in selected user is:");
        console.log(res.data);
        dispatch(setSelectedUserThunk(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const setSelectedUserThunk = (userObject) => ({
  type: SELECT_USER,
  payload: userObject,
});
// make db call
// get user object from db and return that
