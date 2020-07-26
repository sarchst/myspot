import React from "react";
import { Typography } from "@material-ui/core";

class PostComment extends React.Component {
  render() {
    const { commentdata } = this.props;
    return (
      <div>
        {/* <p>{commentdata.time}</p>
        <p>{commentdata.authorId}</p>
        <p>{commentdata.content}</p> */}
        <Typography>{commentdata.time} {commentdata.authorId}: {commentdata.content}</Typography>
      </div>
    );
  }
}

export default PostComment;
