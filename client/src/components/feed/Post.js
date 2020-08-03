import React, { Component } from "react";
import PropTypes from "prop-types";
import Spotify from "spotify-web-api-js";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import PostComment from "./PostComment";
import EditPostDialog from "./EditPostDialog";
import DeletePostDialog from "./DeletePostDialog";
import { deletePost, addComment } from "../../app/actions/postActions";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";
import {
  submitDeletePostDialog,
  submitEditPostDialog,
} from "../../app/actions";

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
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ReplyIcon from "@material-ui/icons/Reply";
import ShareIcon from "@material-ui/icons/Share";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const spotifyWebApi = new Spotify();

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOptions: false,
      anchorEl: null,
      commentContent: "",
      successSnackOpen: false,
      errorSnackOpen: false,
      containsSnackOpen: false,
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  chooseIcon = (type) => {
    switch (type) {
      case "playlist":
        return <PlaylistAddIcon color={"primary"} />;
      case "album":
        return <AlbumIcon color={"primary"} />;
      default:
        return <MusicNoteIcon color={"primary"} />;
    }
  };

  goToMedia = (url) => {
    window.open(url);
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
    // Copy URL to clipboard? maybe add filter that just shows one post?
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

  addPostMedia = (type, media) => {
    if (type === "playlist") {
      spotifyWebApi
        .areFollowingPlaylist([media._id], [this.props.user.id])
        .then((res) => {
          if (res[0]) {
            return false;
          } else {
            return spotifyWebApi.followPlaylist(media._id);
          }
        })
        .then((res) => {
          if (res === "") {
            this.setState({
              successSnackOpen: true,
            });
          } else {
            this.setState({
              containsSnackOpen: true,
            });
          }
        })
        .catch((err) => {
          this.setState({
            errorSnackOpen: true,
          });
          console.log("error adding song to MySpot playlist: ", err);
        });
    } else if (type === "album") {
      spotifyWebApi
        .containsMySavedAlbums([media._id])
        .then((res) => {
          if (res[0]) {
            return false;
          } else {
            return spotifyWebApi.addToMySavedAlbums([media._id]);
          }
        })
        .then((res) => {
          if (res === "") {
            this.setState({
              successSnackOpen: true,
            });
          } else {
            this.setState({
              containsSnackOpen: true,
            });
          }
        })
        .catch((err) => {
          this.setState({
            errorSnackOpen: true,
          });
          console.log("error adding song to MySpot playlist: ", err);
        });
    } else {
      spotifyWebApi
        .removeTracksFromPlaylist(this.props.mySpotPlaylists.MySpotPlaylistID, [
          "spotify:track:" + media._id,
        ])
        .then(() => {
          return spotifyWebApi.addTracksToPlaylist(
            this.props.mySpotPlaylists.MySpotPlaylistID,
            ["spotify:track:" + media._id]
          );
        })
        .then((res) => {
          this.setState({
            successSnackOpen: true,
          });
        })
        .catch((err) => {
          this.setState({
            errorSnackOpen: true,
          });
          console.log("error adding song to MySpot playlist: ", err);
        });
    }
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      successSnackOpen: false,
      containssSnackOpen: false,
      errorSnackOpen: false,
    });
  };

  getAlertMessage = (postdata) => {
    if (postdata.type === "playlist") {
      return (
        postdata.media.name +
        " - " +
        postdata.media.ownerUsername +
        " playlist added to your Spotify"
      );
    } else if (postdata.type === "track") {
      return (
        postdata.media.name +
        " - " +
        postdata.media.artist +
        " added to your MySpot playlist!"
      );
    } else if (postdata.type === "album") {
      return (
        postdata.media.name +
        " - " +
        postdata.media.artist +
        " added to your Spotify"
      );
    }
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
                {postdata.repost ? (
                  <Typography variant="button" color="secondary">
                    Repost
                  </Typography>
                ) : null}
              </Grid>
              <Grid item>
                <Typography>{postdata.content}</Typography>
              </Grid>
              <Grid container item alignItems="center">
                {this.chooseIcon(postdata.type)}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => this.goToMedia(postdata.media.spotifyLink)}
                >
                  <Typography>
                    {postdata.media.artist
                      ? postdata.media.name + " - " + postdata.media.artist
                      : postdata.media.name +
                        " - " +
                        postdata.media.ownerUsername}
                  </Typography>
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
                <Tooltip title="Like Post">
                  <IconButton
                    className={classes.button}
                    size="small"
                    aria-label="like"
                    aria-controls="like-post"
                    onClick={() => this.like()}
                    color={
                      postdata.usersLiked.includes(userId)
                        ? "primary"
                        : "default"
                    }
                  >
                    {postdata.usersLiked.length}
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Repost">
                  <IconButton
                    className={classes.button}
                    size="small"
                    aria-label="repost"
                    aria-controls="repost-post"
                    onClick={() => this.repost(postdata)}
                  >
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Share Post">
                  <IconButton
                    className={classes.button}
                    size="small"
                    aria-label="share"
                    aria-controls="share-post"
                    onClick={() => this.share(postdata)}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title={
                    postdata.type === "track"
                      ? "Add " + postdata.type + " to your MySpot Playlist"
                      : "Add " + postdata.type + " to your Spotify"
                  }
                >
                  <IconButton
                    className={classes.button}
                    size="small"
                    aria-label="add"
                    aria-controls="add-media"
                    onClick={() =>
                      this.addPostMedia(postdata.type, postdata.media)
                    }
                  >
                    <LibraryAddIcon />
                  </IconButton>
                </Tooltip>
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
        <div className={classes.root}>
          <Snackbar
            open={this.state.successSnackOpen}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <Alert onClose={() => this.handleClose()} severity="success">
              {this.getAlertMessage(postdata)}
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.containsSnackOpen}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <Alert onClose={() => this.handleClose()} severity="info">
              This media is already in your library.
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.errorSnackOpen}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <Alert onClose={() => this.handleClose()} severity="error">
              Error adding selected Media.
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  mySpotPlaylists: state.mySpotPlaylists,
  spotifyApi: state.spotifyApi,
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
