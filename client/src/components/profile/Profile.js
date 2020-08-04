import React from "react";
import { connect } from "react-redux";
import Emoji from "react-emoji-render";
import InfiniteScroll from "react-infinite-scroll-component";

import DeletePostDialog from "../feed/DeletePostDialog";
import FilterPosts from "../feed/FilterPosts";
import MakePost from "../feed/MakePost";
import ProfileCard from "./ProfileCard";
import ProfileTable from "./ProfileTable";
import Post from "../feed/Post";
import {
  toggleLike,
  fetchPostsWithFilter,
} from "../../app/actions/postActions";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

class Profile extends React.Component {
  state = {
    items: [],
    hasMore: false,
  };

  componentDidMount = () => {
    const { match } = this.props;
    this.props.fetchSelectedUser(match.params.user);
    this.props.fetchPostsWithFilter(match.params.user, this.props.filter);
    // if (this.props.user && this.props.user.profilePic) {
    //   this.props.fetchProfilePicSuccess(this.props.user.profilePic);
    // } else {
    //   this.props.fetchProfilePic(match.params.user);
    // }
    // if (this.props.user && this.props.user.settings) {
    //   this.props.fetchUserSettingsSuccess(this.props.user.settings);
    // } else {
    //   this.props.fetchUserSettings(this.props.user.id);
    // }
    window.scrollTo(0, 0);
  };

  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      this.setState({
        items: this.props.posts.slice(0, 5),
        hasMore: true,
      });
    }
    if (
      this.props.filter !== prevProps.filter ||
      prevProps.selectedUser.username !== this.props.selectedUser.username
    ) {
      this.props.fetchPostsWithFilter(
        this.props.selectedUser._id,
        this.props.filter
      );
    }
  }

  fetchMoreData = () => {
    if (this.state.items.length >= this.props.posts.length) {
      this.setState({ hasMore: false });
      return;
    }
    let n = this.state.items.length;
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.props.posts.slice(n, n + 5)),
      });
    }, 500);
  };

  render() {
    const { classes, user, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <DeletePostDialog />
        <ProfileCard />
        <ProfileTable />
        {user.id === this.props.selectedUser._id ? <MakePost /> : null}
        <Grid container justify="flex-end">
          <FilterPosts page="PROFILE" />
        </Grid>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          scrollThreshold={1}
          loader={
            <Typography color="primary" style={{ textAlign: "center" }}>
              <Emoji text="Loading... :eyes:" />
            </Typography>
          }
          endMessage={
            <Typography color="primary" style={{ textAlign: "center" }}>
              <Emoji text="Yay! You have seen it all :party_popper:" />
            </Typography>
          }
        >
          <div>
            {this.props.posts && this.props.posts.length ? (
              this.state.items.map((p) => (
                <Post
                  key={p._id}
                  postdata={p}
                  toggleLike={() => toggleLike(p, user.id)}
                  userId={user.id}
                />
              ))
            ) : (
              <h3 color="primary">Hmm...no posts yet. You should make one!</h3>
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.profileFeed.posts,
  filter: state.profileFeed.filter,
  selectedUser: state.selectedUser,
});

const mapDispatchToProps = {
  toggleLike,
  fetchPostsWithFilter,
  fetchSelectedUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
