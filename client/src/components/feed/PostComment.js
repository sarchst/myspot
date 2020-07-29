import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
// import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { connect } from "react-redux";
import { compose } from "redux";
import { deleteComment } from "../../app/actions/postActions";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: 0,
    width: 30,
    height: 30,
    fontSize: "0.6rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

class PostComment extends React.Component {
  like = () => {
    // TODO connect # likes to db
    console.log("Liked!");
  };

  handleDeleteComment = (commentdata) => {
    let postOwnerId = commentdata.postOwnerId;
    let authorId = commentdata.authorId;

    let commentInfo = {
      postId: commentdata.postId,
      commentId: commentdata._id,
    };
    this.props.deleteComment(postOwnerId, authorId, commentInfo);
    console.log("Delete comment!");
  };

  render() {
    const { commentdata, classes } = this.props;

    let commentDeleteButton = null;
    if (this.props.user.id === commentdata.authorId) {
      commentDeleteButton = (
        <IconButton
          className={classes.button}
          onClick={() => this.handleDeleteComment(commentdata)}
        >
          <HighlightOffOutlinedIcon fontSize="small" />
        </IconButton>
      );
    }

    return (
      // <Grid container direction="row" justify="space-between">
      <Grid
        item
        container
        direction="row"
        spacing={1}
        alignItems="center"
        // className="commentContainer"
      >
        <Grid item>
          <Typography
            color="primary"
            // className="commentItem"
          >
            {commentdata.time}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="secondary"
            // fontWeight="bold"
            // className="commentItem"
          >
            {commentdata.authorUsername}:
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            // className="commentItem"
            fontFamily="Monospace"
          >
            {commentdata.content}
          </Typography>
        </Grid>

        {/* TODO: reinstate comment likes if we have time */}
        {/* <Grid item>
          <IconButton
            className={classes.button}
            size="small"
            aria-label="like"
            aria-controls="like-post"
            onClick={() => this.like()}
            color={
              commentdata.usersLiked.includes(this.props.user.id)
                ? "red"
                : "default"
            }
          >
            {commentdata.usersLiked.length}
            <FavoriteOutlinedIcon />
          </IconButton>
        </Grid> */}
        <Grid>
          {/* <IconButton
                className={classes.button}
                onClick={() => this.handleDeleteComment(commentdata)}
              >
                <HighlightOffOutlinedIcon fontSize="small" />
              </IconButton> */}
          {commentDeleteButton}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { deleteComment })
)(PostComment);
