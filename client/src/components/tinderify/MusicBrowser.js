import React from "react";
import Spotify from "spotify-web-api-js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import Box from "@material-ui/core/Box";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  audioPlayer: {
    width: "50%",
  },
  profileCardBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const spotifyWebApi = new Spotify();

class MusicBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      discoverWeeklyId: "",
      discoverWeeklyImageUrl: "",
      songUri: "",
      trackName: "",
      trackArtist: "",
      trackAlbumArt: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }
  //"rmu8czqk3wc8on8ym4xnwq88o"
  componentDidMount() {
    if (this.props.user_ID) {
      console.log("its a friend!");
      spotifyWebApi.getUserPlaylists(this.props.user_ID).then(
        //spotifyWebApi.getUserPlaylists("rmu8czqk3wc8on8ym4xnwq88o").then(
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
    } else {
      console.log("ITS ME");
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

  notInterested() {
    console.log("Not into it");
  }

  setPlayerSong = (track) => {
    console.log(track);
    this.setState({
      songUri: track.preview_url,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.discoverWeeklyId ? (
          <div>
            {this.state.songUri ? (
              // <Typography></Typography>
              //     <List className={classes.listRoot} dense={true}>
              //         <ListItem key={index}>
              //           <ListItemAvatar>
              //             <Avatar
              //               classes={{ primary: classes.listItemText }}
              //               variant="square"
              //               src={
              //                 track.track.album.images.length
              //                   ? track.track.album.images[
              //                       track.track.album.images.length - 1
              //                     ].url
              //                   : null
              //               }
              //             ></Avatar>
              //           </ListItemAvatar>
              //           <ListItemText
              //             classes={{ primary: classes.listItemText }}
              //             primary={track.track.name}
              //             secondary={track.track.album.artists.map(
              //               (artist, index) =>
              //                 artist.name +
              //                 (index < track.track.album.artists.length - 1
              //                   ? " | "
              //                   : "")
              //             )}
              //           />
              //         </ListItem>
              //       );
              //   </List>

              <Box className={classes.profileCardBox} pb={1}>
                <audio
                  className={classes.audioPlayer}
                  autoPlay
                  controls="controls"
                  src={this.state.songUri}
                ></audio>
              </Box>
            ) : null}
            <CarouselProvider
              naturalSlideWidth={5}
              naturalSlideHeight={5}
              totalSlides={this.state.tracks.length}
            >
              <Slider>
                {this.state.tracks.map((track, index) => {
                  const isPlaybackAvailable = track.track.preview_url
                    ? true
                    : false;
                  return (
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
                        <Box pr={1} pt={1}>
                          {isPlaybackAvailable ? (
                            <PlayCircleOutlineIcon
                              onClick={
                                isPlaybackAvailable
                                  ? () => this.setPlayerSong(track.track)
                                  : null
                              }
                              color={"secondary"}
                              fontSize="large"
                            />
                          ) : (
                            <MusicOffOutlinedIcon
                              color={"secondary"}
                              fontSize="large"
                            />
                          )}
                        </Box>
                        <NotInterestedIcon
                          className="not-interested"
                          onClick={() => this.notInterested()}
                        ></NotInterestedIcon>

                        <FavoriteIcon
                          className="favorite"
                          onClick={() => this.likeSong(track.track.preview_url)}
                        ></FavoriteIcon>
                      </div>
                    </Slide>
                  );
                })}
              </Slider>
            </CarouselProvider>
          </div>
        ) : (
          <h1>
            To start using Tinderify please like your Discover Weekly playlist
            on Spotify!
          </h1>
        )}
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

export default connect(mapStateToProps)(withStyles(styles)(MusicBrowser));
