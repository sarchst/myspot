import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  FormControl,
  Input,
  Link,
  Menu,
  MenuItem,
  Paper,
  InputLabel,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ReplyIcon from "@material-ui/icons/Reply";
import ShareIcon from "@material-ui/icons/Share";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import { deletePost, addComment } from "../../app/actions/postActions";
import DeletePostDialog from "./DeletePostDialog";
import {
  submitDeletePostDialog,
  submitEditPostDialog,
} from "../../app/actions";
import PostComment from "./PostComment";
// import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import "emoji-mart/css/emoji-mart.css";
import EditPostDialog from "./EditPostDialog";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  postContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: "flex",
    padding: 10,
    square: true,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  display: {
    display: "flex",
    padding: 0,
    borderRadius: 12,
    margin: 5,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  userGrid: {
    margin: 5,
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
  buttongroup: {
    margin: 0,
    padding: 0,
  },
  moreGid: {
    maxWidth: 50,
  },
  media: {
    // media style
  },
  routerLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.secondary.main,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

class Post extends Component {
  state = {
    moreOptions: false,
    anchorEl: null,
    commentContent: "",
  };

  chooseIcon = (media) => {
    switch (media) {
      case "playlist":
        return <PlaylistAddIcon color={"primary"} />;
      case "album":
        return <AlbumIcon color={"primary"} />;
      default:
        return <MusicNoteIcon color={"primary"} />;
    }
  };

  goToMedia = () => {
    // TODO GOTO media
  };

  like = () => {
    this.props.toggleLike();
  };

  repost = (post) => {
    // create new post
    console.log(post);
  };

  share = (type) => {
    // TODO share spotify media
    console.log(type);
  };
  handleDelete = (postId) => {
    const payload = {
      open: this.props.delPostDialog.open,
      postId: postId,
    };
    console.log(payload);
    this.props.submitDeletePostDialog(payload);
    this.closeOptions();
  };

  addPostMedia = (type) => {
    // TODO: add song, album, or playlist
    console.log(type);
  };

  openMoreOptions = (e) => {
    this.setState({
      moreOptions: true,
      anchorEl: e.currentTarget,
    });
  };

  closeOptions = () => {
    this.setState({
      moreOptions: false,
      anchorEl: null,
    });
  };

  handleChangeComment = (e) => {
    this.setState({ commentContent: e.target.value });
  };

  handleSubmitComment = (postId, postOwnerId) => {
    let comment = {
      content: this.state.commentContent,
      usersLiked: [],
      authorId: this.props.user.id,
      authorUsername: this.props.user.username,
      postOwnerId: postOwnerId,
      postId: postId,
      time: new Date().toLocaleString("en-US"),
    };
    this.props.addComment(
      comment,
      this.props.profileFeedFilter,
      this.props.feedFilter
    );
    this.setState({
      commentContent: "",
    });
  };

  handleEdit = (postId, postContent) => {
    const payload = {
      open: this.props.editPostDialog.open,
      postId: postId,
      postContent: postContent,
    };
    this.props.submitEditPostDialog(payload);
    this.closeOptions();
  };

  render() {
    const { classes, postdata, userId } = this.props;
    const date = new Date(postdata.createdAt).toLocaleString("en-US");
    let deleteOption,
      repostOption,
      editOption = null;
    if (this.props.user.id === postdata.authorId) {
      deleteOption = (
        <MenuItem onClick={() => this.handleDelete(postdata._id)}>
          Delete
        </MenuItem>
      );
      editOption = (
        <MenuItem
          onClick={() => this.handleEdit(postdata._id, postdata.content)}
        >
          Edit
        </MenuItem>
      );
    } else {
      repostOption = <MenuItem>Repost</MenuItem>;
    }

    return (
      <div className={classes.postContainer}>
        <DeletePostDialog />
        <EditPostDialog />
        <Paper className={classes.paper}>
          <Grid
            item
            container
            xs={2}
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.userGrid}
          >
            <Grid item>
              <RouterLink
                className={classes.routerLink}
                to={`/${postdata.authorId}`}
                onClick={() => {
                  this.props.fetchSelectedUser(postdata.authorId);
                }}
              >
                <Avatar
                  className={classes.display}
                  src={postdata.profilePic}
                  alt="profile-pic"
                />
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink
                className={classes.link}
                to={`/${postdata.authorId}`}
                onClick={() => {
                  this.props.fetchSelectedUser(postdata.authorId);
                }}
              >
                <Typography className={classes.routerLink}>
                  {postdata.username}
                </Typography>
              </RouterLink>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid
              item
              container
              xs={9}
              spacing={2}
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                {postdata.repost ? <Typography variant="button" color="secondary">Repost</Typography> : null}
              </Grid>
              <Grid item>
                <Typography>{postdata.content}</Typography>
              </Grid>
              <Grid container item alignItems="center">
                {this.chooseIcon(postdata.type)}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => this.goToMedia()}
                >
                  <Typography>{postdata.media}</Typography>
                </Link>
              </Grid>
              {/* TODO add media art component? */}
            </Grid>
            <Grid
              item
              container
              xs
              className={classes.moreGrid}
              justify="flex-end"
              alignItems="flex-start"
            >
              <Grid item color="primary">
                <Grid
                  container
                  direction="column"
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Typography color="primary">{date}</Typography>
                  {postdata.createdAt !== postdata.updatedAt && (
                    <Typography variant="caption">Edited</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e) => this.openMoreOptions(e)}
                  className={classes.button}
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>
              <Menu
                id="options-menu"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={this.state.moreOptions}
                onClose={this.closeOptions}
                PaperProps={{
                  style: {
                    maxHeight: 300,
                    width: "20ch",
                  },
                }}
              >
                {editOption}
                {deleteOption}
                {repostOption}
              </Menu>
            </Grid>
            <Grid
              item
              container
              className={classes.buttongroup}
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="like"
                  aria-controls="like-post"
                  onClick={() => this.like()}
                  color={
                    postdata.usersLiked.includes(userId) ? "primary" : "default"
                  }
                >
                  {postdata.usersLiked.length}
                  <EmojiEmotionsIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="repost"
                  aria-controls="repost-post"
                  onClick={() => this.repost(postdata)}
                >
                  <ReplyIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="share"
                  aria-controls="share-post"
                  onClick={() => this.share(postdata)}
                >
                  <ShareIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="add"
                  aria-controls="add-media"
                  onClick={() => this.addPostMedia(postdata)}
                >
                  <LibraryAddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Divider />
        <Grid>
          <Accordion
            defaultExpanded={false}
            style={{
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading} color={"primary"}>
                  Comments ({postdata.comments.length})
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <ul className={classes.column}>
                {postdata.comments && postdata.comments.length
                  ? postdata.comments.map((comment, index) => {
                      return <PostComment key={index} commentdata={comment} />;
                    })
                  : null}
              </ul>
              <Grid item container direction="row" alignItems="center">
                <Grid item xs={11}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-basic" color={"secondary"}>
                      Leave a comment below
                    </InputLabel>
                    <Input
                      value={this.state.commentContent}
                      onChange={this.handleChangeComment}
                      color={"secondary"}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.handleSubmitComment(
                            postdata._id,
                            postdata.authorId
                          );
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div className={classes.column} />
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.handleSubmitComment(postdata._id, postdata.authorId)
                }
              >
                Post
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  delPostDialog: state.delPostDialog,
  editPostDialog: state.editPostDialog,
  feedFilter: state.feed.filter,
  profileFeedFilter: state.profileFeed.filter,
});

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  postdata: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    deletePost,
    submitDeletePostDialog,
    addComment,
    submitEditPostDialog,
    fetchSelectedUser,
  })
)(Post);
