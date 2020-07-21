import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

const spotifyWebApi = new Spotify();

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      discoverWeeklyId: "",
      discoverWeeklyImageUrl: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
    this.printSongId = this.printSongId.bind(this);
    this.testing = this.testing.bind(this);
  }

  componentDidMount() {
    spotifyWebApi.getUserPlaylists().then(
      (data) => {
        let playlist = data.items.find((o) => o.name === "Discover Weekly");
        if (playlist) {
          this.setState({
            discoverWeeklyId: playlist.id,
          });
        }
        console.log("Discover weekly ", playlist);
        console.log(this.state.discoverWeeklyId);
        // get the songs
        spotifyWebApi.getPlaylist(this.state.discoverWeeklyId).then(
          (data) => {
            console.log("SONG data", data);
            this.setState({
              tracks: data.tracks.items,
              discoverWeeklyImageUrl: data.images[0].url,
            });
          },
          function (err) {
            console.error(err);
          }
        );
      },
      function (err) {
        console.error(err);
      }
    );
  }

  printSongId(id) {
    console.log(id);
    let ids = [id];
    spotifyWebApi.addToMySavedTracks(ids).then(
      (data) => {
        console.log("save song", data);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  testing() {
    console.log("trying to make playlist");
    spotifyWebApi
      .createPlaylist("sarchistar", { name: "my new playlist" })
      .then(
        (data) => {
          console.log(data);
        },
        function (err) {
          console.error(err);
        }
      );
  }

  notInterested() {
    console.log("Not into it");
  }

  render() {
    return (
      <div>
        <button onClick={() => this.testing()}>CLICK HERE PLZ</button>
        {this.state.discoverWeeklyId ? (
          <h1>Tinderify</h1>
        ) : (
          <h1>
            To start using Tinderify please like your Discover Weekly playlist
            on Spotify!
          </h1>
        )}
        <CarouselProvider
          naturalSlideWidth={5}
          naturalSlideHeight={5}
          totalSlides={this.state.tracks.length}
        >
          <ButtonBack>Backer</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          <Slider>
            {this.state.tracks.map((track, index) => (
              <Slide key={index}>
                <div className="container">
                  <div className="avatar-flip">
                    <img
                      src={track.track.album.images[0].url}
                      height="150"
                      width="150"
                      alt="this is album art"
                    ></img>
                    <img
                      src={this.state.discoverWeeklyImageUrl}
                      height="150"
                      width="150"
                    ></img>
                  </div>
                  <h1>{track.track.name}</h1>
                  <h2>by</h2>
                  <h2>{track.track.artists[0].name}</h2>
                  <NotInterestedIcon
                    onClick={() => this.notInterested()}
                  ></NotInterestedIcon>

                  <FavoriteIcon
                    onClick={() => this.printSongId(track.track.id)}
                  ></FavoriteIcon>
                </div>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
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
