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
  Select,
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
  submit: {
    float: "right",
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
    mediaOptions: [],
  };

  // TODO componentDidMount get playlists adn set state

  handleChange = (e, value) => {
    this.setState({ type: value });
  };

  handleTypeSelect = (event, type) => {
    if (type !== null) {
      this.setState({ type: type });
    }
  };

  handleMediaSelect = (event, media) => {
    if (media !== null) {
      this.setState({ media: media });
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
                  native
                  value={this.state.media}
                  onChange={this.handleMediaSelect}
                >
                  {this.state.mediaOptions.map((mc) => {
                    return <option value={mc}>{mc}</option>;
                  })}
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
