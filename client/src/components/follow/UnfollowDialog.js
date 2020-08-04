import React from "react";
import { connect } from "react-redux";
import { confirmUnfollowDialog, closeUnfollowDialog } from "../../app/actions";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

class UnfollowDialog extends React.Component {
  handleConfirm = () => {
    this.props.handleUnfollow(this.props.unfollowDialog.userId);
    this.props.closeUnfollowDialog();
  };
  handleCancel = () => {
    this.props.closeUnfollowDialog();
  };
  render() {
    if (!this.props.unfollowDialog.open) {
      return null;
    } else {
      return (
        <div>
          <Dialog
            open={this.props.unfollowDialog.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Unfollow Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to unfollow{" "}
                {this.props.unfollowDialog.username}?
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
                Unfollow
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  unfollowDialog: state.unfollowDialog,
});

export default connect(mapStateToProps, {
  confirmUnfollowDialog,
  closeUnfollowDialog,
})(UnfollowDialog);
