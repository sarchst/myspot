import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { makePost } from "../app/actions";
import { toggleLike } from "../app/actions/feedActions";
import { fetchPosts } from "../app/actions/postActions";
import Post from "./feed/Post";
import ProfileCard from "./profile/ProfileCard";

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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 1,
      // userID: 1,
      username: "",
      content: "",
      title: "",
      type: "",
      // usersLiked: new Set([]),
    };
  }

  componentDidMount = (id) => {
    // TODO: change "mikayla" with id once active user is set up
    console.log("component profile mount");
    this.setState({ username: this.props.username });
    this.props.fetchPosts("mikayla");
  };

  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  updateTitle = (title) => {
    this.setState({ title });
  };

  updateContent = (content) => {
    this.setState({ content });
  };

  // componentDidMount = () => {
  //   this.setState({ username: this.props.username });
  // };

  handleSubmitPost = () => {
    // dispatches actions to add msg
    this.props.makePost(this.state);
    // // resets state back to empty string
    // this.setState({ input: "" });
    console.log(this.state);
  };

  render() {
    const { classes, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <ProfileCard />
        <Paper className={classes.paper}>
          <Typography className={classes.header}>Create a new post</Typography>
          <FormControl component="fieldset">
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
          </FormControl>
          <Typography>Title</Typography>
          <input
            onChange={(event) => this.updateTitle(event.target.value)}
            value={this.state.input}
          />
          <Typography>Content:</Typography>
          <input
            onChange={(event) => this.updateContent(event.target.value)}
            value={this.state.content}
          />
        </Paper>

        <Button onClick={this.handleSubmitPost} color="primary">
          Create a new post
        </Button>

        <div>
          {this.props.posts && this.props.posts.length ? (
            this.props.posts.map((p) => (
              <Post
                key={p._id}
                postdata={p}
                toggleLike={() => toggleLike({ post: p, userId: 7 })}
                userId={7}
              />
            ))
          ) : (
            <h3 color="primary">Hmm..no posts yet. You should make one!</h3>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
  posts: state.posts,
});

export default connect(mapStateToProps, { makePost, fetchPosts, toggleLike })(
  withStyles(styles)(Profile)
);
