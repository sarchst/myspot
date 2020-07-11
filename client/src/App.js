import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Spotify from "spotify-web-api-js";
import { registerSpotifyWebApi, usernameSubmit } from "./app/actions";
import { submitSpotifyApiUserMe } from "./app/actions/spotifyApiActions";

const spotifyWebApi = new Spotify();

// const loginPage = () => {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// };

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6200EE",
      variant: "#3700B3",
    },
    secondary: {
      main: "#03DAC6",
      variant: "#018786",
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
});
class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    // console.log("params is: ");
    // console.log(params);
    // console.log("access token is " + params.access_token);

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      console.log("LOGGING IN: SENDING SPOTIFYWEBAPI TO REDUX STORE");
      this.props.registerSpotifyWebApi(params.access_token);
      spotifyWebApi.getMe().then((response) => {
        console.log("user profile response object ");
        console.log(response);
        this.props.submitSpotifyApiUserMe(response);
        this.props.usernameSubmit(response.display_name);
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
    this.props.accountSettings.darkmode ? darkTheme : lightTheme;

  render() {
    if (this.props.spotifyWebApi) {
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
    username: state.username,
    accountSettings: state.accountSettings,
    spotifyWebApi: state.spotifyWebApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    usernameSubmit: (username) => dispatch(usernameSubmit(username)),
    registerSpotifyWebApi: (spotifyWebApi) =>
      dispatch(registerSpotifyWebApi(spotifyWebApi)),
    submitSpotifyApiUserMe: (spotifyUserMe) =>
      dispatch(submitSpotifyApiUserMe(spotifyUserMe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
