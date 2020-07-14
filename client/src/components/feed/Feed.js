import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import MakePost from "./MakePost";
import {
  toggleLike,
  fetchFeed,
  addPersonalPostsToFeed,
} from "../../app/actions/feedActions";
import { fetchPosts } from "../../app/actions/postActions";

class Feed extends React.Component {
  componentDidMount = (id) => {
    this.props.fetchFeed(this.props.user.current.id);
    // TODO this will have to change most likely
    // this.props.fetchPosts(this.props.user.active.id);
  };

  render() {
    const { toggleLike, user } = this.props;
    // if (this.props.feed.posts) {

    // For now, we are rendering the active user's posts and the other user's posts separately
    // Eventually I will do a combined query and render only from feed store to Feed component
    return (
      <div>
        <MakePost />
        <div>
          {this.props.feed.posts.map((p) => (
            <Post
              key={p._id}
              postdata={p}
              toggleLike={() =>
                toggleLike({ post: p, userId: user.current.id })
              }
              userId={user.current.id}
            />
          ))}
        </div>
        {/* <div>
          {this.props.posts.map((p) => (
            <Post
              key={p._id}
              postdata={p}
              toggleLike={() =>
                toggleLike({ post: p, userId: user.current.id })
              }
              userId={user.current.id}
            />
          ))}
        </div> */}
      </div>
    );
    // } else {
    //   return <h1>Nothing to see here</h1>;
    // }
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
  // addPersonalPostsToFeed,
  fetchPosts,
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
