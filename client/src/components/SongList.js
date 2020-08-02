import React from "react";
import { Link } from "react-router-dom";
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

const spotifyWebApi = new Spotify();

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
});

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      name: "",
      description: "",
      songlistType: "",
      albumImage: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount() {
    if ("playlistid" in this.props.match.params) {
      // get playlist songs
      spotifyWebApi.getPlaylistTracks(this.props.match.params.playlistid).then(
        (data) => {
          console.log("Songs in playlist", data);
          this.setState({
            songlistType: "playlist",
          });
          const tracks = this.organizeTrackData(data.items);
          this.setState({
            tracks: tracks,
          });
        },
        function (err) {
          console.error(err);
        }
      );

      spotifyWebApi.getPlaylist(this.props.match.params.playlistid).then(
        (data) => {
          console.log("Playlist data", data);
          this.setState({
            name: data.name,
            description: data.description,
          });
        },
        function (err) {
          console.error(err);
        }
      );
    } else if ("albumid" in this.props.match.params) {
      // get album songs
      spotifyWebApi.getAlbumTracks(this.props.match.params.albumid).then(
        (data) => {
          console.log("Songs in album", data);
          this.setState({
            songlistType: "album",
          });
          const tracks = this.organizeTrackData(data.items);
          this.setState({
            tracks: tracks,
          });
        },
        function (err) {
          console.error(err);
        }
      );
      spotifyWebApi.getAlbum(this.props.match.params.albumid).then(
        (data) => {
          console.log("Album data", data);
          this.setState({
            name: data.name,
            description: data.artists.map(
              (artist, index) =>
                artist.name + (index < data.artists.length - 1 ? " | " : "")
            ),
            albumImage: data.images.length
              ? data.images[data.images.length - 1].url
              : null,
          });
        },
        function (err) {
          console.error(err);
        }
      );
    }
  }

  organizeTrackData = (data) => {
    const tracks = [];
    if (this.state.songlistType === "playlist") {
      data.map((track, index) =>
        tracks.push({
          image: track.track.album.images.length
            ? track.track.album.images[track.track.album.images.length - 1].url
            : null,
          name: track.track.name,
          artists: track.track.artists.map(
            (artist, index) =>
              artist.name +
              (index < track.track.artists.length - 1 ? " | " : "")
          ),
        })
      );
    } else if (this.state.songlistType === "album") {
      data.map((track, index) =>
        tracks.push({
          name: track.name,
          artists: track.artists.map(
            (artist, index) =>
              artist.name + (index < track.artists.length - 1 ? " | " : "")
          ),
        })
      );
    }
    return tracks;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.songlistType === "playlist" ? (
          <Link to={"/" + this.props.user.username + "/playlists"}>
            Go Back
          </Link>
        ) : (
          <Link to={"/" + this.props.user.username + "/albums"}>Go Back</Link>
        )}
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
                {this.state.name}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                {this.state.description}
              </Typography>
            </Container>
          </div>
        </CssBaseline>
        <Container maxWidth="lg">
          <List className={classes.listRoot} dense={true}>
            {this.state.tracks.map((track, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={
                        this.state.songlistType === "playlist"
                          ? track.image
                          : this.state.albumImage
                      }
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary={track.name}
                    secondary={track.artists}
                  />
                </ListItem>
              );
            })}
          </List>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyApi: state.spotifyApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SongList)
);
