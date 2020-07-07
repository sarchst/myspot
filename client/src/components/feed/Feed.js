import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import { toggleLike, fetchFeed } from "../../app/actions/feedActions";

class Feed extends React.Component {
  componentDidMount = (id) => {
    // TODO: change "mikayla" with id once active user is set up
    this.props.fetchFeed("mikayla");
  };
  render() {
    const { toggleLike } = this.props;
    console.log(this.props.feed.posts);
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
  fetchFeed,
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
