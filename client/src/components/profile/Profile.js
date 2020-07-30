import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleLike } from "../../app/actions/feedActions";
import { fetchPosts } from "../../app/actions/postActions";
import Post from "../feed/Post";
import MakePost from "../feed/MakePost";
import ProfileCard from "./ProfileCard";
import ProfileTable from "./ProfileTable";
import { fetchUserSettings } from "../../app/actions/settingsActions";
import { fetchProfilePic } from "../../app/actions/imageUploadActions";
import DeletePostDialog from "../feed/DeletePostDialog";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import Emoji from "react-emoji-render";

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
    hasMore: true,
    count: 0
  };

  componentDidMount = () => {
    this.props.fetchPosts(this.props.user.id);
    this.props.fetchUserSettings(this.props.user.id);
    this.props.fetchProfilePic(this.props.user.id);
  };

  componentDidUpdate(prevProps) {
    console.log("PROFILE: CDU");
    // Typical usage (don't forget to compare props):
    if (this.props.posts !== prevProps.posts) {
      console.log("PROFILE: CDU if");
      this.setState({
        items: this.props.posts.slice(0, 5),
      });
    }
    console.log("count", this.state.count);
    console.log("length", this.state.items.length);
    console.log("items", this.state.items);
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
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <Typography color="primary" style={{ textAlign: "center" }}>
              <Emoji text="Loading... :eyes:"/>
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
              this.props.posts.map((p) => (
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
  posts: state.posts,
});

const mapDispatchToProps = {
  toggleLike,
  fetchPosts,
  fetchUserSettings,
  fetchProfilePic,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
