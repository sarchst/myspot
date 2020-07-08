import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import {
  Avatar,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ReplyIcon from "@material-ui/icons/Reply";
import ShareIcon from "@material-ui/icons/Share";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    padding: 10,
    borderRadius: 16,
    margin: 5,
  },
  display: {
    display: "flex",
    padding: 0,
    borderRadius: 12,
    margin: 5,
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
};

const menuOptions = ["edit", "delete", "report"];

class Post extends Component {
  state = {
    moreOptions: false,
    anchorEl: null,
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

  render() {
    const { classes, postdata, userId } = this.props;
    return (
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
            <Avatar className={classes.display}>DP</Avatar>
          </Grid>
          <Grid item>{postdata.author}</Grid>
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
            <Grid item>{postdata.content}</Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => this.goToMedia()}
              >
                {postdata.media}
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
              {menuOptions.map((option) => (
                <MenuItem key={option} onClick={() => this.closeOptions()}>
                  {option}
                </MenuItem>
              ))}
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
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  postdata: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(Post);
