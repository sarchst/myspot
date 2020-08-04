import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link as RouterLink } from "react-router-dom";

import { deleteComment } from "../../app/actions/postActions";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

import { Grid, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
  routerLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

class PostComment extends React.Component {
  handleDeleteComment = (commentdata) => {
    let postOwnerId = commentdata.postOwnerId;
    let body = {
      authorId: commentdata.authorId,
      commentInfo: {
        postId: commentdata.postId,
        commentId: commentdata._id,
      },
    };
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <RouterLink
            className={classes.routerLink}
            to={`/${commentdata.authorId}`}
            onClick={() => {
              this.props.fetchSelectedUser(commentdata.authorId);
            }}
          >
            <Typography color="secondary" variant="subtitle2">
              {commentdata.authorUsername}:
            </Typography>
          </RouterLink>
        </Grid>
        <Grid item xs={8}>
          <Typography fontFamily="Monospace" variant="subtitle2">
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
        <Grid>{commentDeleteButton}</Grid>
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
