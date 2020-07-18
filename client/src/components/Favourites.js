import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();
// todo: (Sarchen) reuse songlist component
class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }

  componentDidMount() {
    spotifyWebApi.getMySavedTracks().then(
      (data) => {
        console.log("MY SAVED TRACKS", data);
        this.setState({
          tracks: data.items,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }
  // this component is just a stand in to display info, will replace with prettier version
  render() {
    return (
      <div>
        <Link to={"/" + this.props.user.username + "/playlists"}>Go Back</Link>
        <h1>{this.state.name}</h1>
        <h4>{this.state.description}</h4>
        <ul style={{ listStyleType: "none" }}>
          {this.state.tracks.map((track, index) => (
            <li key={index}>
              <img
                src={track.track.album.images[0].url}
                style={{ width: 50, height: 50 }}
                alt="this is album art"
              />
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
    user: state.user,
  };
};

export default connect(mapStateToProps)(Favourites);
