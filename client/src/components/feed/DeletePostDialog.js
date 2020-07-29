import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  submitDeletePostDialog,
  closeDeletePostDialog,
} from "../../app/actions/index";
import { deletePost } from "../../app/actions/postActions";

class DeletePostDialog extends React.Component {
  handleConfirm = () => {
    const body = { postId: this.props.delPostDialog.postId };
    this.props.deletePost(this.props.user.id, body);
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
            onClose={this.handleClose}
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
});
export default connect(mapStateToProps, {
  submitDeletePostDialog,
  closeDeletePostDialog,
  deletePost,
})(DeletePostDialog);
