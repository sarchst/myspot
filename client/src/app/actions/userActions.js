import { setSelectedUser } from "./selectedUserActions";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload: payload,
});

export const submitSpotifyApiUserMe = (SpotifyApiUserInfoMe) => {
  return (dispatch) => {
    let mongoUserObject = {
      _id: SpotifyApiUserInfoMe.id,
      username: SpotifyApiUserInfoMe.display_name,
      country: SpotifyApiUserInfoMe.country,
      topTracks: SpotifyApiUserInfoMe.topTracks || null,
      recentTracks: SpotifyApiUserInfoMe.recentTracks || null,
    };
    fetch(`http://localhost:9000/user/${SpotifyApiUserInfoMe.display_name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mongoUserObject),
    })
      .then((res) =>
        res.json().then((response) => {
          dispatch(setSelectedUser(response.User));
          dispatch(setCurrentUser(response.User));
        })
      )
      .catch((err) => {
        console.log("user update error from spotifyAPIActions", err);
      });
  };
};
