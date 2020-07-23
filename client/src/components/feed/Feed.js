import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import MakePost from "./MakePost";
import { toggleLike, fetchFeed } from "../../app/actions/feedActions";
import { fetchPosts } from "../../app/actions/postActions";

class Feed extends React.Component {
  state = {
    userProfilePics: {},
  };

  componentDidMount() {
    this.props.fetchFeed(this.props.user.id);
  }

 
  render() {
    const { toggleLike, user } = this.props;

    if (this.props.feed.posts) {
      return (
        <div>
          <MakePost />
          <div>
            {this.props.feed.posts.map((p) => (
              <Post
                key={p._id}
                postdata={p}
                toggleLike={() => toggleLike({ post: p, userId: user.id })}
                userId={user.id}
              />
            ))}
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
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
