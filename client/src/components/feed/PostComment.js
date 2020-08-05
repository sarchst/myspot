import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { deleteComment } from "../../app/actions/postActions";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { Link as RouterLink } from "react-router-dom";

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
  routerLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    "&:hover": {
      textDecoration: "underline",
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
    // let authorId = commentdata.authorId;

    // let commentInfo = {
    //   postId: commentdata.postId,
    //   commentId: commentdata._id,
    // };
    let body = {
      authorId: commentdata.authorId,
      commentInfo: {
        postId: commentdata.postId,
        commentId: commentdata._id,
      },
    };
    // this.props.deleteComment(postOwnerId, authorId, commentInfo);
    this.props.deleteComment(
      postOwnerId,
      body,
      this.props.profileFeedFilter,
      this.props.feedFilter
    );
  };

  render() {
    const { commentdata, classes } = this.props;

    let commentDeleteButton = null;
    if (this.props.user.id === commentdata.authorId) {
      commentDeleteButton = (
        <IconButton
          className={classes.button}
          onClick={() => this.handleDeleteComment(commentdata)}
          color="secondary"
        >
          <HighlightOffOutlinedIcon fontSize="small" />
        </IconButton>
      );
    }

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={9}>
          <RouterLink
            className={classes.routerLink}
            to={`/${commentdata.authorId}`}
            onClick={() => {
              this.props.fetchSelectedUser(commentdata.authorId);
            }}
          >
            <Typography color="secondary" variant="caption" >
              {commentdata.authorUsername}:
            </Typography>
          </RouterLink>
          <Typography fontFamily="Monospace" variant="subtitle2" style={{ fontWeight: "italic" }}>
            {commentdata.content}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color="primary" variant="caption">
            {commentdata.time}
          </Typography>
        </Grid>
        <Grid item xs={1}>
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
  connect(mapStateToProps, { deleteComment, fetchSelectedUser })
)(PostComment);
