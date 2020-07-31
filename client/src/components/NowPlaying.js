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
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  getNowPlaying() {
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

  addSongToMySpotPlayList = () => {
    // this structure format ensures that there are no duplicate tracks in the playlist.
    // first we delete any existing instances of the track, then we add one copy of the track.
    // if you want to allow multiple copies of the track to appear on the playlist, omit removeTracksFromPlaylist()
    // note that for both spotify API calls, we pass in a list of URIs (meaning you can add multiple tracks at once if desired).
    // URI is in the form `spotify:track:${track.id}`
    spotifyWebApi
      .removeTracksFromPlaylist(this.props.mySpotPlaylists.MySpotPlaylistID, [
        "spotify:track:4cxvludVmQxryrnx1m9FqL",
      ])
      .then(() => {
        return spotifyWebApi.addTracksToPlaylist(
          this.props.mySpotPlaylists.MySpotPlaylistID,
          ["spotify:track:4cxvludVmQxryrnx1m9FqL"]
        );
      })
      .then((res) => {})
      .catch((err) => {
        console.log("error adding song to myspot playlist");
        console.log(err);
      });
  };

  // only major difference between this function and addSongToMySpotPlayList() is that the Tinderify playlist ID
  // is passed into the spotifyWebApi method calls
  // this function also shows how you can add multiple songs at once
  addSongToTinderifyPlayList = () => {
    spotifyWebApi
      .removeTracksFromPlaylist(
        this.props.mySpotPlaylists.TinderifyPlaylistID,
        [
          "spotify:track:5ygDXis42ncn6kYG14lEVG",
          "spotify:track:4uLU6hMCjMI75M1A2tKUQC",
        ]
      )
      .then(() => {
        return spotifyWebApi.addTracksToPlaylist(
          this.props.mySpotPlaylists.TinderifyPlaylistID,
          [
            "spotify:track:5ygDXis42ncn6kYG14lEVG",
            "spotify:track:4uLU6hMCjMI75M1A2tKUQC",
          ]
        );
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error adding song to tinderify playlist");
        console.log(err);
      });
  };

  render() {
    if (!this.state.nowPlaying.name) {
      return (
        <div>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          <button onClick={() => this.addSongToMySpotPlayList()}>
            Example of how to add a song to the MySpot Playlist
          </button>
          <button onClick={() => this.addSongToTinderifyPlayList()}>
            Example of how to add a song to the Tinderify Playlist
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          <h2>Now Playing: {this.state.nowPlaying.name}</h2>
          <img src={this.state.nowPlaying.image} alt="Media for Now Playing" />
          <button onClick={() => this.addSongToMySpotPlayList()}>
            Example of how to add a song to the MySpot Playlist
          </button>
          <button onClick={() => this.addSongToTinderifyPlayList()}>
            Example of how to add a song to the Tinderify Playlist
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mySpotPlaylists: state.mySpotPlaylists,
    spotifyApi: state.spotifyApi,
  };
};

export default connect(mapStateToProps)(NowPlaying);
