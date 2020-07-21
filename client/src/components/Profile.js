import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleLike } from "../app/actions/feedActions";
import { fetchPosts } from "../app/actions/postActions";
import Post from "./feed/Post";
import MakePost from "./feed/MakePost";
import ProfileCard from "./profile/ProfileCard";
import { fetchUserSettings } from "../app/actions/settingsActions";


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
  componentDidMount = () => {
    // console.log("in CDM " + this.props.match.params.user);
    this.props.fetchPosts(this.props.user.id);
    this.props.fetchUserSettings(this.props.user.id);
  };

  // Should be able to pass this.props.match.params.user here as an argument to Profile to render
  // the correct Profile Page, whether that is yourself or another user
  render() {
    const { classes, user, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <ProfileCard />
        <MakePost />
        <div>
          {this.props.posts && this.props.posts.length ? (
            // ALSO this could be a Feed component potentially with a is profile feed prop or something, not front burner issue though
            // this.props.posts.map((p) => (
            this.props.posts.map((p) => (
              <Post
                key={p._id}
                postdata={p}
                toggleLike={() => toggleLike({ post: p, userId: user.id })}
                userId={user.id}
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

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    user: state.user,
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  toggleLike,
  fetchPosts,
  fetchUserSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
