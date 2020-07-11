import React from "react";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { toggleLike } from "../app/actions/feedActions";
import { fetchPosts } from "../app/actions/postActions";
import Post from "./feed/Post";
import MakePost from "./feed/MakePost";
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
      username: "",
      // content: "",
      // title: "",
      // type: "",
      // usersLiked: new Set([]),
    };
  }

  componentDidMount = (id) => {
    // TODO: change "mikayla" with id once active user is set up
    // console.log("component profile mount");
    this.setState({ username: this.props.username });
    this.props.fetchPosts("mikayla");
  };

  // handleChange = (event) => {
  //   this.setState({ type: event.target.value });
  // };

  // updateTitle = (title) => {
  //   this.setState({ title });
  // };

  // updateContent = (content) => {
  //   this.setState({ content });
  // };

  // componentDidMount = () => {
  //   this.setState({ username: this.props.username });
  // };

  // handleSubmitPost = () => {
  //   // dispatches actions to add msg
  //   this.props.makePost(this.state);
  //   // // resets state back to empty string
  //   // this.setState({ input: "" });
  //   console.log(this.state);
  // };

  render() {
    const { classes, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <ProfileCard />
        <MakePost />
        <div>
          {this.props.posts && this.props.posts.length ? (
            this.props.posts.map((p) => (
              <Post
                key={p._id}
                postdata={p}
                toggleLike={() => toggleLike({ post: p, userId: "mikayla" })} // TODO needs to be changed to spotify API username
                userId={"mikayla"}
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

const mapDispatchToProps = {
  toggleLike,
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
