import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

import {
  FormControl,
  Paper,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from "@material-ui/lab";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { withStyles } from "@material-ui/core/styles";
import { makePost } from "../../app/actions/postActions";

const spotifyWebApi = new Spotify();

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    color: theme.palette.primary,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    display: "flex",
    borderRadius: 16,
  },
  submit: {
    float: "right",
  },
  button: {
    color: theme.palette.secondary.main,
  },
});

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      media: null,
      type: "playlist",
      mediaOptions: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount = () => {
    spotifyWebApi.getUserPlaylists(this.props.user.id).then(
      (data) => {
        const playlistOptions = this.getOptions(this.state.type, data.items);
        this.setState({
          mediaOptions: playlistOptions,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  };

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleTypeSelect = (event, type) => {
    if (type !== null) {
      this.setState({ type: type });
    }
    switch (type) {
      case "playlist": {
        spotifyWebApi.getUserPlaylists(this.props.user.id).then(
          (data) => {
            const playlistOptions = this.getOptions(type, data.items);
            this.setState({
              mediaOptions: playlistOptions,
              media: null,
            });
          },
          function (err) {
            console.error(err);
          }
        );
        break;
      }
      case "album": {
        spotifyWebApi.getMySavedAlbums().then(
          (data) => {
            const albumOptions = this.getOptions(type, data.items);
            this.setState({
              mediaOptions: albumOptions,
              media: null,
            });
          },
          function (err) {
            console.error(err);
          }
        );
        break;
      }
      case "track": {
        spotifyWebApi.getMySavedTracks().then(
          (data) => {
            const trackOptions = this.getOptions(type, data.items);
            this.setState({
              mediaOptions: trackOptions,
              media: null,
            });
          },
          function (err) {
            console.error(err);
          }
        );
        break;
      }
      default: {
        break;
      }
    }
  };

  getOptions = (type, mediaOptions) => {
    if (type === "playlist") {
      return mediaOptions.map((mo) => {
        return {
          _id: mo.id,
          name: mo.name,
        };
      });
    } else {
      return mediaOptions.map((mo) => {
        return {
          _id: mo[type].id,
          name: mo[type].name,
        };
      });
    }
  };

  // getOptions = (type, mediaOptions) => {
  //   if (this.state.type === "playlist") {
  //     return mediaOptions.map((mo) => {
  //       return (
  //         <MenuItem key={mo.id} value={mo.id}>
  //           {mo.name}
  //         </MenuItem>
  //       );
  //     });
  //   } else {
  //     return mediaOptions.map((mo) => {
  //       return (
  //         <MenuItem key={mo[type].id} value={mo[type].id}>
  //           {mo[type].name}
  //         </MenuItem>
  //       );
  //     });
  //   }
  // };

  handleMediaSelect = (e, value) => {
    if (value) {
      this.setState({ media: value });
    } else {
      this.setState({
        media: null,
      });
    }
  };

  updateTitle = (title) => {
    this.setState({ title });
  };

  updateContent = (content) => {
    this.setState({ content });
  };

  handleSubmitPost = () => {
    const postObj = {
      username: this.props.user.username,
      authorId: this.props.user.id, // user id, ref to user schema
      usersLiked: [this.props.user.id], // automatically liking your own post
      repost: false,
      content: this.state.content,
      media: this.state.media,
      type: this.state.type,
    };
    this.props.makePost(
      postObj,
      this.props.profileFeedFilter,
      this.props.feedFilter
    );
    this.setState({
      content: "",
      media: null,
      type: "playlist",
    });
    this.handleTypeSelect("", "playlist"); // dummy even as first param
    console.log(this.state);
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="center" justify="flex-end">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-basic">
                  Tell us about your Jams
                </InputLabel>
                <Input
                  id="standard-basic"
                  value={this.state.content}
                  onChange={this.handleChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.handleSubmitPost();
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl>
                <ToggleButtonGroup
                  value={this.state.type}
                  exclusive
                  onChange={this.handleTypeSelect}
                  size="small"
                >
                  <ToggleButton value="playlist" aria-label="playlist">
                    <PlaylistAddIcon />
                  </ToggleButton>
                  <ToggleButton value="album" aria-label="album">
                    <AlbumIcon />
                  </ToggleButton>
                  <ToggleButton value="track" aria-label="track">
                    <MusicNoteIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl style={{ minWidth: 300 }}>
                {/* <InputLabel id="media">Media</InputLabel> */}
                {/* <Select
                  // native
                  value={this.state.media}
                  onChange={this.handleMediaSelect}
                >
                  {this.state.mediaOptions}
                </Select> */}
                <Autocomplete
                  options={this.state.mediaOptions}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={this.capitalizeFirstLetter(this.state.type)}
                    />
                  )}
                  onChange={this.handleMediaSelect}
                  value={this.state.media}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.submit}
                variant="contained"
                onClick={this.handleSubmitPost}
                color="primary"
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  spotifyApi: state.spotifyApi,
  profileFeedFilter: state.profileFeed.filter,
  feedFilter: state.feed.filter,
});

const mapDispatchToProps = {
  makePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MakePost));
