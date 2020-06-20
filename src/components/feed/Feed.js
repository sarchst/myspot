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
            key={p.id}
            postdata={p}
            toggleLike={() => toggleLike({ post: p, userId: 7 })}
            userId={7}
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
