import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Spotify from "spotify-web-api-js";
import { registerSpotifyWebApi } from "./app/actions";
import { setCurrentUser } from "./app/actions/userActions";
import { submitSpotifyApiUserMe } from "./app/actions/spotifyApiActions";
import { fetchUserSettings } from "./app/actions/settingsActions";
import { setSelectedUser } from "./app/actions/selectedUserActions";
import { setPlayListIDs } from "./app/actions/playlistActions";

const spotifyWebApi = new Spotify();
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6200EE",
      variant: "#0383DA",
    },
    secondary: {
      main: "#0383DA",
      variant: "#018786",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiToggleButton: {
      root: {
        "&$selected": {
          color: "#0383DA",
        },
      },
    },

    MuiTableBody: {
      root: {
        color: "#0383DA",
      },
    },
    MuiTableCell: {
      head: {
        color: "#0383DA",
      },
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BB86FC",
      variant: "#3700B3",
    },
    secondary: {
      main: "#03DAC6",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiToggleButton: {
      root: {
        "&$selected": {
          color: "#03DAC6",
        },
      },
    },
    MuiTableBody: {
      root: {
        color: "#03DAC6",
      },
    },
    MuiTableCell: {
      head: {
        color: "#03DAC6",
        fontSize: "medium",
        // fontWeight: "bold",
      },
    },
  },
});
class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      console.log("LOGGING IN: SENDING SPOTIFYWEBAPI TO REDUX STORE");
      let userObject = {};
      this.props.registerSpotifyWebApi(params.access_token);
      const spotifyMePromise = spotifyWebApi.getMe();
      const topTracksPromise = spotifyWebApi.getMyTopTracks();
      const recentTracksPromise = spotifyWebApi.getMyRecentlyPlayedTracks();
      Promise.all([
        spotifyMePromise,
        topTracksPromise,
        recentTracksPromise,
      ]).then((values) => {
        const spotifyMe = values[0];
        const topTracks = values[1];
        const recentTracks = values[2];
        // create db object using spotify user object
        Object.assign(userObject, spotifyMe);
        // add top tracks to db object
        userObject.topTracks = topTracks.items.slice(
          0,
          Math.min(topTracks.items.length, 3)
        );
        // add recent tracks to db object
        userObject.recentTracks = recentTracks.items.slice(
          0,
          Math.min(recentTracks.items.length, 3)
        );
        // set logged in user as initial selectedUser
        this.props.setSelectedUser(userObject.id);
        // dispatch updates spotify info in db
        // TODO: replace redux action with db call instead?
        this.props.submitSpotifyApiUserMe(userObject);
        // set URIs for MySpot and MySpot-Tinderify playlists
        console.log("calling setPlayListIDs in app.js");
        this.props.setPlayListIDs(spotifyMe.id, params.access_token);
        // set current user in redux
        this.props.setCurrentUser(userObject.id, userObject.display_name);

        // if (!TinderifyPlaylistID) {
        //   spotifyWebApi
        //     .createPlaylist(spotifyMe.id, { name: MySpotTinderify })
        //     .then((playlist) => {
        //       TinderifyPlaylistID = playlist.id;
        //     });
        // }

        // TODO: make sure URIs are sent after async completes
        // TODO: tell Quinn not to delete submitSpotifyApiUserMe
        // create promise all and dispatch redux in promise all.then
      });
    }
  }

  // got this code from a Spotify API tutorial https://www.youtube.com/watch?v=prayNyuN3w0
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  selectTheme = () =>
    // TODO swith this too user from database?
    this.props.accountSettings.darkMode ? darkTheme : lightTheme;

  render() {
    if (this.props.spotifyWebApi && this.props.user.id) {
      return (
        <ThemeProvider theme={this.selectTheme()}>
          <Router>
            <div className="App">
              <Appbar />
              <Sidebar />
            </div>
          </Router>
        </ThemeProvider>
      );
    } else {
      return <Login />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    accountSettings: state.accountSettings,
    spotifyWebApi: state.spotifyWebApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (id, username) => dispatch(setCurrentUser(id, username)),
    setSelectedUser: (id) => dispatch(setSelectedUser(id)),
    registerSpotifyWebApi: (spotifyWebApi) =>
      dispatch(registerSpotifyWebApi(spotifyWebApi)),
    submitSpotifyApiUserMe: (spotifyUserMe) =>
      dispatch(submitSpotifyApiUserMe(spotifyUserMe)),
    fetchUserSettings: fetchUserSettings,
    setPlayListIDs: (UserMeID, spotifyToken) =>
      dispatch(setPlayListIDs(UserMeID, spotifyToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
