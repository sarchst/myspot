import React from "react";
import { connect } from "react-redux";

import {
  submitDeletePostDialog,
  closeDeletePostDialog,
} from "../../app/actions/index";
import { deletePost } from "../../app/actions/postActions";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

class DeletePostDialog extends React.Component {
  handleConfirm = () => {
    const body = { postId: this.props.delPostDialog.postId };
    this.props.deletePost(
      this.props.user.id,
      body,
      this.props.profileFeedFilter,
      this.props.feedFilter
    );
    this.props.closeDeletePostDialog();
  };
  handleCancel = () => {
    this.props.closeDeletePostDialog();
  };
  render() {
    if (!this.props.delPostDialog.open) {
      return null;
    } else {
      return (
        <div>
          <Dialog
            open={this.props.delPostDialog.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Post Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your post? This cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCancel}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button onClick={this.handleConfirm} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  delPostDialog: state.delPostDialog,
  user: state.user,
  feedFilter: state.feed.filter,
  profileFeedFilter: state.profileFeed.filter,
});

export default connect(mapStateToProps, {
  submitDeletePostDialog,
  closeDeletePostDialog,
  deletePost,
})(DeletePostDialog);
