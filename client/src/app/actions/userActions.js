import { setSelectedUserThunk } from "./selectedUserActions";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOG_OUT = "LOG_OUT";

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload: payload,
});

export const submitSpotifyApiUserMe = (SpotifyApiUserInfoMe) => {
  return (dispatch) => {
    // save to mongodb via mongoose.prototype.save()
    let mongoUserObject = {
      _id: SpotifyApiUserInfoMe.id,
      username: SpotifyApiUserInfoMe.display_name,
      profilePic:
        SpotifyApiUserInfoMe.images.length !== 0
          ? SpotifyApiUserInfoMe.images[0].url
          : undefined,
      country: SpotifyApiUserInfoMe.country,
      topTracks: SpotifyApiUserInfoMe.topTracks || null,
      recentTracks: SpotifyApiUserInfoMe.recentTracks || null,
    };
    fetch(`http://localhost:9000/user/${SpotifyApiUserInfoMe.display_name}`, {
      method: "PUT", // changed from POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mongoUserObject),
    })
      .then((res) =>
        res.json().then((response) => {
          console.log("response  in useractions", response);
          dispatch(setCurrentUser(response.User));
          dispatch(setSelectedUserThunk(response.User));
        })
      )
      .catch((err) => {
        console.log("user update error from spotifyAPIActions");
        console.log(err);
      });
  };
};

export const logOut = () => ({
  type: LOG_OUT,
});
