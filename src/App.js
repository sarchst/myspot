import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

const loginPage = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

let contentPage = () => {
  return (
    <div className="App">
      <Appbar />
      <Sidebar />
    </div>
  );
};

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        albumArt: "",
      },
    };
  }
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
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
        },
      });
    });
  }
  render() {
    // if (this.props.isLoggedIn) {
    //   return contentPage();
    // } else {
    //   return loginPage();
    // }
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login</button>
        </a>
        <div>Now playing {this.state.nowPlaying.name}</div>
        <div>
          <img
            src={this.state.nowPlaying.albumArt}
            style={{ width: 100 }}
          ></img>
        </div>
        <button onClick={() => this.getNowPlaying()}>Check nwo playing</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
  };
};

export default connect(mapStateToProps)(App);
