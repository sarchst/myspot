import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();
const MySpot = "MySpot";
const MySpotTinderify = "MySpot-Tinderify";
export const SET_PLAYLIST_IDS = "SET_PLAYLIST_IDS";

export const setPlayListIDs = (UserMeID, spotifyToken) => {
  return (dispatch) => {
    spotifyWebApi.setAccessToken(spotifyToken);
    spotifyWebApi
      .getUserPlaylists(UserMeID)
      .then((res) => {
        const playlists = res.items;
        let MySpotPlaylistID = playlists.find(
          (playlist) => playlist.name === MySpot
        );
        let TinderifyPlaylistID = playlists.find(
          (playlist) => playlist.name === MySpotTinderify
        );

        const createdPlaylistURIs = [];
        createdPlaylistURIs.push(
          MySpotPlaylistID
            ? Promise.resolve()
            : spotifyWebApi.createPlaylist(UserMeID, { name: MySpot })
        );
        createdPlaylistURIs.push(
          TinderifyPlaylistID
            ? Promise.resolve()
            : spotifyWebApi.createPlaylist(UserMeID, {
                name: MySpotTinderify,
              })
        );
        Promise.all(createdPlaylistURIs)
          .then((playlists) => {
            MySpotPlaylistID = playlists[0]
              ? playlists[0].id
              : MySpotPlaylistID.id;
            TinderifyPlaylistID = playlists[1]
              ? playlists[1].id
              : TinderifyPlaylistID.id;
            const playlistIDs = {
              MySpotPlaylistID: MySpotPlaylistID,
              TinderifyPlaylistID: TinderifyPlaylistID,
            };
            dispatch(setPlayListIDsThunk(playlistIDs));
          })
          .catch((err) => {
            console.log("error creating playlists at login");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error querying getting user's spotify playlists");
        console.log(err);
      });
  };
};

const setPlayListIDsThunk = (playlistIDs) => {
  return {
    type: SET_PLAYLIST_IDS,
    payload: playlistIDs,
  };
};
