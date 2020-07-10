import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import {
  toggleLike,
  fetchFeed,
  addPersonalPostsToFeed,
} from "../../app/actions/feedActions";

import { fetchPosts } from "../../app/actions/postActions";
class Feed extends React.Component {
  componentDidMount = (id) => {
    // TODO: change "mikayla" with id once active user is set up
    this.props.fetchFeed("mikayla");
    // this.props.addPersonalPostsToFeed("mikayla");
    this.props.fetchPosts("mikayla");
  };
  render() {
    const { toggleLike } = this.props;
    // if (this.props.feed.posts) {
    
    // For now, we are rendering the active user's posts and the other user's posts separately
    // Eventually I will do a combined query and render only from feed store to Feed component
    return (
      <div>
        <div>
          {/* <MakePost /> TODO */}
          {this.props.feed.posts.map((p) => (
            <Post
              key={p._id}
              postdata={p}
              // TODO: the userId's below will need to be set as the active user's id (username) eventually, just set it as me for now
              toggleLike={() =>
                toggleLike({ usersLiked: p.usersLiked, userId: "mikayla" })
              }
              userId={"mikayla"}
            />
          ))}
        </div>
        <div>
          {/* <MakePost /> TODO */}
          {this.props.posts.map((p) => (
            <Post
              key={p._id}
              postdata={p}
              // TODO: the userId's below will need to be set as the active user's id (username) eventually, just set it as me for now
              toggleLike={() =>
                toggleLike({ usersLiked: p.usersLiked, userId: "mikayla" })
              }
              userId={"mikayla"}
            />
          ))}
        </div>
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
});

const mapDispatchToProps = {
  toggleLike,
  fetchFeed,
  addPersonalPostsToFeed,
  fetchPosts,
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
