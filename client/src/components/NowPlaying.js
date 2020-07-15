import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: {
        name: "",
        image: "",
      },
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }

  getNowPlaying() {
    console.log(
      "spotifywebApi inside getnowplaying:",
      this.props.spotifyWebApi
    );
    // spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
    spotifyWebApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        console.log("response is: ", response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.nowPlaying.name) {
      return (
        <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
      );
    } else {
      return (
        <div>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          <h2>Now Playing: {this.state.nowPlaying.name}</h2>
          <img src={this.state.nowPlaying.image} alt="Media for Now Playing" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyWebApi: state.spotifyWebApi,
  };
};

export default connect(mapStateToProps)(NowPlaying);
