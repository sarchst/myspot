import React from "react";
import { connect } from "react-redux";

import Post from "./Post";

class Feed extends React.Component {
  render() {
    return (
      <div>
        {this.props.feed.posts.map((p) => (
          <Post key={p.id} postdata={p} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
