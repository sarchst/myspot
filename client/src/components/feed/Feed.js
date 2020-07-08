import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import { toggleLike } from "../../app/actions/feedActions";

class Feed extends React.Component {
  render() {
    const { toggleLike } = this.props;
    return (
      <div>
        {/* <MakePost /> TODO */}
        {this.props.feed.posts.map((p) => (
          <Post
            key={p._id}
            postdata={p}
            // TODO: the userId's below will need to be set as the active user's id (username) eventually, just set it as me for now
            toggleLike={() =>
              toggleLike({ usersLiked: p.usersLiked, userId: "quinn" })
            }
            userId={"quinn"}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  toggleLike,
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
