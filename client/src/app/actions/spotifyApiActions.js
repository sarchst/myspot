export const SPOTIFY_USER_ME = "SPOTIFY_USER_ME";

export const submitSpotifyApiUserMe = (SpotifyApiUserInfoMe) => ({
  type: SPOTIFY_USER_ME,
  payload: SpotifyApiUserInfoMe,
});
