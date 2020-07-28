import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  submitEditPostDialog,
  closeEditPostDialog,
} from "../../app/actions/index";
import { editPost } from "../../app/actions/postActions";
import {TextField } from "@material-ui/core";

class EditPostDialog extends React.Component {
  state = {
    editedContent: "",
  };

  handleConfirm = () => {
    console.log("new msg is", this.state.editedContent);
    const body = {
      postId: this.props.editPostDialog.postId,
      content: this.state.editedContent,
    };
    console.log(body);
    this.props.editPost(this.props.user.id, body);
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
  editPostDialog: state.editPostDialog,
  user: state.user,
});
export default connect(mapStateToProps, {
  submitEditPostDialog,
  closeEditPostDialog,
  editPost,
})(EditPostDialog);
