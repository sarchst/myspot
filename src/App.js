import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Spotify from 'spotify-web-api-js';
import Button from "@material-ui/core/Button";

const spotifyWebApi = new Spotify();

const loginPage = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

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
    console.log("params is: ");
    console.log(params);
    console.log("access token is " + params.access_token);
    this.state = {
      isLoggedIn: (params.access_token) ? true : false,
      nowPlaying: {
        name: "Not checked",
        image: ""
      }
    }

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log("response is: ");
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      })
    })
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  selectTheme = () =>
    this.props.accountSettings.darkmode ? darkTheme : lightTheme;

  render() {
    if (this.props.isLoggedIn) {
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
      // TODO: use React Router/redirect to from login page to main page after authentication is implemented
      // return loginPage();
      return (
          <div>
            <Button
                // type="submit"
                href={"http://localhost:8888"}
                fullWidth
                variant="contained"
                color="primary"
                // onClick={this.attemptLogin}
            >
              Sign In With Spotify
            </Button>
            <div>Now Playing: {this.state.nowPlaying.name}</div>
            <img src={this.state.nowPlaying.image} style={{width: 100}}/>
            <button onClick= {() => this.getNowPlaying()}>Check Now Playing</button>
          </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    accountSettings: state.accountSettings,
  };
};

export default connect(mapStateToProps)(App);
