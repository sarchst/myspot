export const SPOTIFY_USER_ME = "SPOTIFY_USER_ME";

export const submitSpotifyApiUserMe = (SpotifyApiUserInfoMe) => {
  return (dispatch) => {
    // save to mongodb via mongoose.prototype.save()
    let mongoUserObject = {
      _id: SpotifyApiUserInfoMe.id,
      username: SpotifyApiUserInfoMe.display_name,
      email: SpotifyApiUserInfoMe.email,
      profilePic:
        SpotifyApiUserInfoMe.images.length !== 0
          ? SpotifyApiUserInfoMe.images[0].url
          : "",
    };
    fetch(`http://localhost:9000/user`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mongoUserObject),
    })
      .then((response) => {
        console.log(response);
        dispatch(submitSpotifyApiUserMeThunk(SpotifyApiUserInfoMe));
      })
      .catch((err) => console.log(err));
  };
};

const submitSpotifyApiUserMeThunk = (SpotifyApiUserInfoMe) => ({
  type: SPOTIFY_USER_ME,
  payload: SpotifyApiUserInfoMe,
});
