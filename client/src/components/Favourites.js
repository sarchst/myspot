import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  listItemText: {
    fontSize: "1.5em",
  },
  avatar: {
    width: 200,
    height: 100,
    margin: "auto",
  },
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
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
});

const spotifyWebApi = new Spotify();

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      successSnackOpen: false,
      errorSnackOpen: false,
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount() {
    this.getAllTracks()
      .then((allSavedTracks) => {
        this.setState({ tracks: allSavedTracks });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getAllTracks = async () => {
    let allTracks = [];
    let offset = 0;
    let tracks = await spotifyWebApi.getMySavedTracks({
      limit: 50,
      offset: offset,
    });
    while (tracks.items.length !== 0) {
      allTracks.push(...tracks.items);
      offset += 50;
      tracks = await spotifyWebApi.getMySavedTracks({
        limit: 50,
        offset: offset,
      });
    }
    return allTracks;
  };

  addSongToMySpotPlayList = (id) => {
    spotifyWebApi
      .removeTracksFromPlaylist(this.props.mySpotPlaylists.MySpotPlaylistID, [
        "spotify:track:" + id,
      ])
      .then(() => {
        return spotifyWebApi.addTracksToPlaylist(
          this.props.mySpotPlaylists.MySpotPlaylistID,
          ["spotify:track:" + id]
        );
      })
      .then((res) => {
        this.setState({
          successSnackOpen: true,
        });
      })
      .catch((err) => {
        this.setState({
          errorSnackOpen: true,
        });
        console.log("error adding song to MySpot playlist: ", err);
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Favourites
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Your liked songs
              </Typography>
            </Container>
          </div>
        </CssBaseline>
        <Container maxWidth="lg">
          <List className={classes.listRoot} dense={true}>
            {this.state.tracks.map((track, index) => {
              return (
                <ListItem key={index}>
                  <Tooltip title="Add to MySpot playlist">
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        this.addSongToMySpotPlayList(track.track.id)
                      }
                    >
                      <FavoriteIcon className="favorite" />
                    </IconButton>
                  </Tooltip>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={
                        track.track.album.images.length
                          ? track.track.album.images[
                              track.track.album.images.length - 1
                            ].url
                          : null
                      }
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary={track.track.name}
                    secondary={track.track.album.artists.map(
                      (artist, index) =>
                        artist.name +
                        (index < track.track.album.artists.length - 1
                          ? " | "
                          : "")
                    )}
                  />
                </ListItem>
              );
            })}
          </List>
        </Container>
        <div className={classes.root}>
          <Snackbar
            open={this.state.successSnackOpen}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <Alert onClose={() => this.handleClose()} severity="success">
              Song added to MySpot playlist!
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.errorSnackOpen}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <Alert onClose={() => this.handleClose()} severity="error">
              Error adding song to MySpot playlist.
            </Alert>
          </Snackbar>
        </div>
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

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Favourites)
);
