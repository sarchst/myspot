import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }

  componentDidMount() {
    spotifyWebApi.getPlaylistTracks(this.props.match.params.playlistid).then(
      (data) => {
        console.log(data);
        this.setState({
          tracks: data.items,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }

  render() {
    return (
      <div>
        <h3>Songs</h3>
        <Link to={"/" + this.props.username + "/playlists"}>Go Back</Link>
        <ul>
          {this.state.tracks.map((track, index) => (
            <li key={index}>
              {track.track.name + " - " + track.track.artists[0].name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyWebApi: state.spotifyWebApi,
    username: state.username,
  };
};

export default connect(mapStateToProps)(SongList);
