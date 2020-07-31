import React, { Fragment } from "react";
import Spotify from "spotify-web-api-js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import Box from "@material-ui/core/Box";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const styles = (theme) => ({
  audioPlayer: {
    width: "50%",
  },
  musicPlayerBox: {
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
      trackArtist: [],
      trackAlbumArt: [],
      trackID: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }
  componentDidMount() {
    if (this.props.user_ID) {
      console.log("its a friend!");
      spotifyWebApi.getUserPlaylists(this.props.user_ID).then(
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

  addSongToTinderifyPlayList = (id) => {
    console.log(id);
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
        console.log(res);
      })
      .catch((err) => {
        console.log("error adding song to tinderify playlist");
        console.log(err);
      });
  };

  setPlayerSong = (track) => {
    console.log(track);
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
        {this.state.discoverWeeklyId ? (
          <div>
            {this.state.songUri ? (
              <Fragment>
                <Box className={classes.musicPlayerBox} pb={1}>
                  <List>
                    <ListItem>
                      <FavoriteIcon
                        m={2}
                        onClick={() =>
                          this.addSongToTinderifyPlayList(this.state.trackID)
                        }
                      ></FavoriteIcon>
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
                            src={this.state.discoverWeeklyImageUrl}
                            height="150"
                            width="150"
                            alt="Discover Weekly Art"
                          ></img>
                        </div>
                        <h2>{track.track.name}</h2>
                        <h4>by</h4>
                        <h4>{track.track.artists[0].name}</h4>
                        <FavoriteIcon
                          className="favorite"
                          onClick={() =>
                            this.addSongToTinderifyPlayList(track.track.id)
                          }
                        ></FavoriteIcon>
                        <Box>
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
    mySpotPlaylists: state.mySpotPlaylists,
    spotifyApi: state.spotifyApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(MusicBrowser));
