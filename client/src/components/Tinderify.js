import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
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
import WhatshotIcon from "@material-ui/icons/Whatshot";

const spotifyWebApi = new Spotify();

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
  },
});

class Tinderify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      discoverWeeklyId: "",
      discoverWeeklyImageUrl: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);

    this.likeSong = this.likeSong.bind(this);
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
        // get the songs
        spotifyWebApi.getPlaylist(this.state.discoverWeeklyId).then(
          (data) => {
            console.log("Songs in Discover Weekly", data);
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

  likeSong(id) {
    console.log("Liked ", id);
    // let ids = [id];
    // spotifyWebApi.addToMySavedTracks(ids).then(
    //   (data) => {
    //     console.log("save song", data);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );
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
    const { classes } = this.props;
    return (
      <div>
        {/* <button onClick={() => this.testing()}>CLICK HERE PLZ</button> */}
        {this.state.discoverWeeklyId ? (
          <CssBaseline>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  <h1 className="tinderify-title">Tinderify</h1>
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Swipe through your Discover Weekly playlist and like songs to
                  add to your Favourites!
                </Typography>
              </Container>
            </div>
          </CssBaseline>
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
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          <Slider>
            {this.state.tracks.map((track, index) => (
              <Slide key={index}>
                {/* song html card from: https://www.bypeople.com/profile-card-hover-effect/ */}
                <div className="container">
                  <div className="avatar-flip">
                    <img
                      src={track.track.album.images[0].url}
                      height="150"
                      width="150"
                      alt="Album Art"
                    ></img>
                    <img
                      src={this.state.discoverWeeklyImageUrl}
                      height="150"
                      width="150"
                      alt="Discover Weekly Art"
                    ></img>
                  </div>
                  <h2>{track.track.name}</h2>
                  <h4>by</h4>
                  <h4>{track.track.artists[0].name}</h4>
                  <NotInterestedIcon
                    onClick={() => this.notInterested()}
                  ></NotInterestedIcon>

                  <FavoriteIcon
                    onClick={() => this.likeSong(track.track.id)}
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

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Tinderify)
);
