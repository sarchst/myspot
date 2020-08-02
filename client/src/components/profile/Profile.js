import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleLike } from "../../app/actions/postActions";
import {
  // fetchPosts,
  fetchPostsWithFilter,
} from "../../app/actions/postActions";
import Post from "../feed/Post";
import MakePost from "../feed/MakePost";
import ProfileCard from "./ProfileCard";
import ProfileTable from "./ProfileTable";
import FilterPosts from "../feed/FilterPosts";
import { fetchUserSettings } from "../../app/actions/settingsActions";
import { fetchProfilePic } from "../../app/actions/imageUploadActions";
import DeletePostDialog from "../feed/DeletePostDialog";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import Emoji from "react-emoji-render";
import { Grid } from "@material-ui/core";

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
  state = {
    items: [],
    hasMore: false,
  };

  componentDidMount = () => {
    const { match } = this.props;
    this.props.fetchSelectedUser(match.params.user);
    // this.props.fetchPosts(this.props.user.id);
    this.props.fetchPostsWithFilter(match.params.user, this.props.filter);
    this.props.fetchUserSettings(this.props.user.id);
    this.props.fetchProfilePic(match.params.user);
    window.scrollTo(0, 0);
  };

  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      this.setState({
        items: this.props.posts.slice(0, 5),
        hasMore: true,
      });
    }
    // check if filter has been changed
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchPostsWithFilter(this.props.user.id, this.props.filter);
    }
  }

  fetchMoreData = () => {
    if (this.state.items.length >= this.props.posts.length) {
      this.setState({ hasMore: false });
      return;
    }
    let n = this.state.items.length;
    // a fake async api call like which sends
    // 5 more records in 0.5 secs
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
        <MakePost />
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
              // ALSO this could be a Feed component potentially with a is profile feed prop or something, not front burner issue though
              // this.props.posts.map((p) => (
              this.state.items.map((p) => (
                <Post
                  key={p._id}
                  postdata={p}
                  toggleLike={() => toggleLike(p, user.id)}
                  userId={user.id}
                />
              ))
            ) : (
              <h3 color="primary">Hmm..no posts yet. You should make one!</h3>
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
  fetchUserSettings,
  fetchProfilePic,
  fetchSelectedUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
