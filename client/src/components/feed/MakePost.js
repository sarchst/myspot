import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import {
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Paper,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makePost } from "../../app/actions/feedActions";
import Post from "./Post";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    // margin: theme.spacing(2, 0),
    color: theme.palette.primary,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

const marks = [
  {
    value: "playlist",
    label: "Playlist",
  },
  {
    value: "album",
    label: "Album",
  },
  {
    value: "song",
    label: "Song",
  },
];

class MakePost extends React.Component {
  state = {
    content: "",
    title: "",
    type: "playlist",
  };

  handleChange = (e, value) => {
    this.setState({ type: value });
  };

  handleTypeSelect = (event, type) => {
    if (type !== null) {
      this.setState({ type: type });
    }
  };

  updateTitle = (title) => {
    this.setState({ title });
  };

  updateContent = (content) => {
    this.setState({ content });
  };

  componentDidMount = () => {
    this.setState({ username: this.props.username });
  };
  handleSubmitPost = () => {
    // dispatches actions to add msg
    this.props.makePost(this.state);
    // // resets state back to empty string
    // this.setState({ input: "" });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={2}
            // direction="column"
            // justify="center"
            // alignItems="center"
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-basic">Post your Jams</InputLabel>
                <Input
                  id="standard-basic"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              {/* <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              aria-label="PostType"
              name="postType"
              value={this.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="playlist"
                control={<Radio />}
                label="Playlist"
              />
              <FormControlLabel
                value="album"
                control={<Radio />}
                label="Album"
              />
              <FormControlLabel value="song" control={<Radio />} label="Song" />
            </RadioGroup>
          </FormControl> */}
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
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Button onClick={this.handleSubmitPost} color="primary">
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
  username: state.username,
  posts: state.posts,
});

const mapDispatchToProps = {
  makePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MakePost));
