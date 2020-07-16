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
  componentDidMount = (id) => {
    this.props.fetchPosts(this.props.user.id);
    this.props.fetchUserSettings(this.props.user.id);
  };

  render() {
    const { classes, user, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <ProfileCard />
        <MakePost />
        <div>
          {this.props.posts && this.props.posts.length ? (
            // TODO TEMPORARY this is just reversing the order for presentational purposes, will be fixed once we query our posts in right order
            // ALSO this could be a Feed component potentially with a is profile feed prop or something, not front burner issue though
            // this.props.posts.map((p) => (
            this.props.posts
              .slice()
              .reverse()
              .map((p) => (
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

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});

const mapDispatchToProps = {
  toggleLike,
  fetchPosts,
  fetchUserSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
