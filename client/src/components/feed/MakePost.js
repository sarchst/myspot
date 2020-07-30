import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import {
  FormControl,
  Paper,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { withStyles } from "@material-ui/core/styles";
import { makePost } from "../../app/actions/postActions";

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
  state = {
    authorId: this.props.user.id, // user id, ref to user schema
    content: "",
    media: "",
    type: "playlist",
    usersLiked: [this.props.user.id], // automatically liking your own post
    // mediaOptions: [],
    username: this.props.user.username,
  };

  componentDidMount = () => {
    // // TODO STILL NEED componentDidMount to get playlists and set state mediaOptions
  };

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleTypeSelect = (event, type) => {
    if (type !== null) {
      this.setState({ type: type });
    }
  };

  handleMediaSelect = (e) => {
    this.setState({ media: e.target.value });
  };

  updateTitle = (title) => {
    this.setState({ title });
  };

  updateContent = (content) => {
    this.setState({ content });
  };

  handleSubmitPost = () => {
    this.props.makePost(this.state);
    // TODO media options will have to change after spotify integration
    this.setState({ content: "", media: "", type: "playlist" });
    console.log(this.state);
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
                  <ToggleButton value="song" aria-label="song">
                    <MusicNoteIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="media">Media</InputLabel>
                <Select
                  // native
                  value={this.state.media}
                  onChange={this.handleMediaSelect}
                >
                  {/* TODO REPLACE temporary option with this mapping once api has connect with spotify
                  {this.state.mediaOptions.map((mc) => {
                    return <option value={mc}>{mc}</option>;
                  })} */}
                  <MenuItem value="my awesome playlist">
                    my awesome playlist
                  </MenuItem>
                  <MenuItem value="my firday night playlist">
                    my friday night playlist
                  </MenuItem>
                  <MenuItem value="my workout playlist">
                    my workout playlist
                  </MenuItem>
                </Select>
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
  posts: state.posts,
});

const mapDispatchToProps = {
  makePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MakePost));
