export const SPOTIFY_WEB_API = "SPOTIFY_WEB_API";

export const registerSpotifyApi = (spotifyApi) => ({
  type: SPOTIFY_WEB_API,
  payload: spotifyApi,
});
