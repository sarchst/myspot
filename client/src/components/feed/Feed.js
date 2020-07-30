import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import MakePost from "./MakePost";
import FilterPosts from "./FilterPosts";
import { toggleLike, fetchFeed } from "../../app/actions/feedActions";
import { fetchPosts } from "../../app/actions/postActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import Emoji from "react-emoji-render";
import { Grid } from "@material-ui/core";

class Feed extends React.Component {
  state = {
    userProfilePics: {},
    items: [],
    hasMore: false,
  };

  componentDidMount() {
    // change fetchFeed to take second filter param
    this.props.fetchFeed(this.props.user.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.feed.posts !== prevProps.feed.posts) {
      this.setState({
        items: this.props.feed.posts.slice(0, 5),
        hasMore: true,
      });
    }
  }

  fetchMoreData = () => {

    if (this.state.items.length >= this.props.feed.posts.length) {
      this.setState({ hasMore: false });
      return;
    }
    let n = this.state.items.length;
    // a fake async api call like which sends
    // 5 more records in 0.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.props.feed.posts.slice(n, n + 3)),
      });
    }, 500);
  };

  render() {
    const { toggleLike, user } = this.props;

    if (this.props.feed.posts) {
      return (
        <div>
          <MakePost />
          <Grid container justify="flex-end">
            <FilterPosts />
          </Grid>

          <div>
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
              {this.state.items.map((p) => (
                <Post
                  key={p._id}
                  postdata={p}
                  toggleLike={() => toggleLike(p, user.id)}
                  userId={user.id}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      );
    } else {
      return (
        <h1>
          Hmm, there's nothing on your feed yet! Add some friends to see their
          posts.
        </h1>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  feed: state.feed,
  posts: state.posts,
  user: state.user,
});

const mapDispatchToProps = {
  toggleLike,
  fetchFeed,
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
