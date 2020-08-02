import React, { Fragment } from "react";
import Spotify from "spotify-web-api-js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import Box from "@material-ui/core/Box";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  audioPlayer: {
    width: "50%",
  },
  musicPlayerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
});

const spotifyWebApi = new Spotify();

class MusicBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      playlistId: "",
      playlistImageUrl: "",
      songUri: "",
      trackName: "",
      trackArtist: [],
      trackAlbumArt: [],
      trackID: "",
      successSnackOpen: false,
      errorSnackOpen: false,
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }
  componentDidMount() {
    let user_ID = this.props.user_ID
      ? this.props.user_ID
      : this.props.otherUser;

    spotifyWebApi.getUserPlaylists(user_ID).then(
      (data) => {
        let playlist = data.items.find((o) => o.name === "Discover Weekly");
        if (playlist) {
          this.setState({
            playlistId: playlist.id,
          });
        } else {
          this.setState({
            playlistId: data.items[0].id,
          });
        }
        // get the songs
        spotifyWebApi.getPlaylist(this.state.playlistId).then(
          (data) => {
            console.log("Songs in Playlist", data);
            this.setState({
              tracks: data.tracks.items,
              playlistImageUrl: data.images[0].url,
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

  addSongToTinderifyPlayList = (id) => {
    spotifyWebApi
      .removeTracksFromPlaylist(
        this.props.mySpotPlaylists.TinderifyPlaylistID,
        ["spotify:track:" + id]
      )
      .then(() => {
        return spotifyWebApi.addTracksToPlaylist(
          this.props.mySpotPlaylists.TinderifyPlaylistID,
          ["spotify:track:" + id]
        );
      })
      .then((res) => {
        this.setState({
          successSnackOpen: true,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log("error adding song to tinderify playlist");
        this.setState({
          errorSnackOpen: true,
        });
        console.log(err);
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      successSnackOpen: false,
      errorSnackOpen: false,
    });
  };

  setPlayerSong = (track) => {
    this.setState({
      songUri: track.preview_url,
      trackArtist: track.artists,
      trackName: track.name,
      trackAlbumArt: track.album.images,
      trackID: track.id,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.playlistId ? (
          <div>
            {this.state.songUri ? (
              <Fragment>
                <Box className={classes.musicPlayerBox} pb={1}>
                  <List>
                    <ListItem>
                      <Tooltip title="Add Song">
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            this.addSongToTinderifyPlayList(this.state.trackID)
                          }
                        >
                          <FavoriteIcon className="favorite" />
                        </IconButton>
                      </Tooltip>

                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          src={
                            this.state.trackAlbumArt.length
                              ? this.state.trackAlbumArt[
                                  this.state.trackAlbumArt.length - 1
                                ].url
                              : null
                          }
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={this.state.trackName}
                        secondary={this.state.trackArtist.map(
                          (artist, index) =>
                            artist.name +
                            (index < this.state.trackArtist.length - 1
                              ? " | "
                              : "")
                        )}
                      />
                    </ListItem>
                  </List>
                  <audio
                    className={classes.audioPlayer}
                    autoPlay
                    controls="controls"
                    src={this.state.songUri}
                  ></audio>
                </Box>
              </Fragment>
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
                            src={this.state.playlistImageUrl}
                            height="150"
                            width="150"
                            alt="Discover Weekly Art"
                          ></img>
                        </div>
                        <h2>{track.track.name}</h2>
                        <h4>by</h4>
                        <h4>{track.track.artists[0].name}</h4>
                        <Box>
                          {isPlaybackAvailable ? (
                            <Tooltip title="Play Song">
                              <IconButton
                                onClick={
                                  isPlaybackAvailable
                                    ? () => this.setPlayerSong(track.track)
                                    : null
                                }
                              >
                                <PlayCircleOutlineIcon
                                  color={"secondary"}
                                  fontSize="large"
                                />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="No song preview available">
                              <IconButton>
                                <MusicOffOutlinedIcon
                                  color={"secondary"}
                                  fontSize="large"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                        <Tooltip title="Add Song">
                          <IconButton
                            onClick={() =>
                              this.addSongToTinderifyPlayList(track.track.id)
                            }
                          >
                            <FavoriteIcon className="favorite" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Slide>
                  );
                })}
              </Slider>
            </CarouselProvider>
            <div className={classes.root}>
              <Snackbar
                open={this.state.successSnackOpen}
                autoHideDuration={6000}
                onClose={() => this.handleClose()}
              >
                <Alert onClose={() => this.handleClose()} severity="success">
                  Song added to MySpot-Tinderify!
                </Alert>
              </Snackbar>
              <Snackbar
                open={this.state.errorSnackOpen}
                autoHideDuration={6000}
                onClose={() => this.handleClose()}
              >
                <Alert onClose={() => this.handleClose()} severity="error">
                  Error adding song to MySpot-Tinderify.
                </Alert>
              </Snackbar>
            </div>
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
    mySpotPlaylists: state.mySpotPlaylists,
    spotifyApi: state.spotifyApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(MusicBrowser));
