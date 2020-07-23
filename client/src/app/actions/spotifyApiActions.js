export const SPOTIFY_USER_ME = "SPOTIFY_USER_ME";

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
    console.log("mongoUserOjvect in spotifyApiAction");
    console.log(mongoUserObject.topTracks.length);
    fetch(`http://localhost:9000/user/${SpotifyApiUserInfoMe.display_name}`, {
      method: "PUT", // changed from POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mongoUserObject),
    })
      .then((response) => {
        console.log("user update success from spotifyAPIActions");
        dispatch(submitSpotifyApiUserMeThunk(SpotifyApiUserInfoMe));
      })
      .catch((err) => {
        console.log("user update error from spotifyAPIActions");
        console.log(err);
      });
  };
};

const submitSpotifyApiUserMeThunk = (SpotifyApiUserInfoMe) => ({
  type: SPOTIFY_USER_ME,
  payload: SpotifyApiUserInfoMe,
});
