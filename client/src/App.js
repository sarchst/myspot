import React from "react";
import Spotify from "spotify-web-api-js";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollToTop";
import {
  registerSpotifyApi,
  submitSpotifyApiUserMe,
} from "./app/actions/spotifyApiActions";
import { setCurrentUser } from "./app/actions/userActions";
import { fetchUserSettings } from "./app/actions/settingsActions";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

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
      let userObject = {};
      // Pass refresh token as well for further use if a new access token is needed
      this.props.registerSpotifyApi(params);
      spotifyWebApi
        .getMe()
        .then((response) => {
          Object.assign(userObject, response);
          return spotifyWebApi.getMyTopTracks();
        })
        .then((topTracksResponse) => {
          if (topTracksResponse) {
            userObject.topTracks = topTracksResponse.items.slice(
              0,
              Math.min(topTracksResponse.items.length, 3)
            );
          }
          return spotifyWebApi.getMyRecentlyPlayedTracks();
        })
        .then((recentTracksResponse) => {
          if (recentTracksResponse) {
            userObject.recentTracks = recentTracksResponse.items.slice(
              0,
              Math.min(recentTracksResponse.items.length, 3)
            );
          }
          this.props.submitSpotifyApiUserMe(userObject);
          this.props.setCurrentUser(userObject.id, userObject.display_name);
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
    this.props.accountSettings.darkMode ? darkTheme : lightTheme;

  render() {
    if (this.props.spotifyApi.accessToken && this.props.user.id) {
      return (
        <ThemeProvider theme={this.selectTheme()}>
          <Router>
            <div className="App">
              <ScrollToTop />
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
    spotifyApi: state.spotifyApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (id, username) => dispatch(setCurrentUser(id, username)),
    registerSpotifyApi: (spotifyApi) =>
      dispatch(registerSpotifyApi(spotifyApi)),
    submitSpotifyApiUserMe: (spotifyUserMe) =>
      dispatch(submitSpotifyApiUserMe(spotifyUserMe)),
    fetchUserSettings: fetchUserSettings,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
