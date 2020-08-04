import React from "react";
import { connect } from "react-redux";

import {
  submitEditPostDialog,
  closeEditPostDialog,
} from "../../app/actions/index";
import { editPost } from "../../app/actions/postActions";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

class EditPostDialog extends React.Component {
  state = {
    editedContent: "",
  };

  handleConfirm = () => {
    const body = {
      postId: this.props.editPostDialog.postId,
      content: this.state.editedContent,
    };
    this.props.editPost(
      this.props.user.id,
      body,
      this.props.profileFeedFilter,
      this.props.feedFilter
    );
    this.props.closeEditPostDialog();
  };
  handleCancel = () => {
    this.props.closeEditPostDialog();
  };
  handleChangeContent = (e) => {
    this.setState({ editedContent: e.target.value });
  };
  render() {
    if (!this.props.editPostDialog.open) {
      return null;
    } else {
      return (
        <div>
          <Dialog
            open={this.props.editPostDialog.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="sm"
          >
            <DialogTitle id="alert-dialog-title">{"Edit Post"}</DialogTitle>
            <DialogContent>
              <TextField
                id="filled"
                fullWidth={true}
                multiline={true}
                rows={5}
                size="medium"
                defaultValue={this.props.editPostDialog.postContent}
                onChange={this.handleChangeContent}
              ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.handleConfirm}
                color="primary"
                variant="contained"
                autoFocus
              >
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
  editPostDialog: state.editPostDialog,
  user: state.user,
  feedFilter: state.feed.filter,
  profileFeedFilter: state.profileFeed.filter,
});
export default connect(mapStateToProps, {
  submitEditPostDialog,
  closeEditPostDialog,
  editPost,
})(EditPostDialog);
