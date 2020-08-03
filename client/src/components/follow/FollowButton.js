import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { confirmUnfollowDialog } from "../../app/actions";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupIcon from "@material-ui/icons/Group";
import UnfollowDialog from "./UnfollowDialog";

class FollowButton extends React.Component {
  performAction = (followeeId) => {
    const buttonText = this.props.selectedUser.followers.includes(
      this.props.user.id
    )
      ? "Following"
      : "Follow";

    if (buttonText === "Follow") {
      axios
        .put(`http://localhost:9000/user/following/${this.props.user.id}`, {
          id: followeeId,
          remove: false,
        })
        .then((res) => {
          // this.props.fetchSelectedUser(res.data.data);
        })
        .catch((error) => {
          throw error;
        });
    } else if (buttonText === "Following") {
      const payload = {
        open: this.props.unfollowDialog.open,
        username: this.props.selectedUser.username,
      };
      this.props.confirmUnfollowDialog(payload);
    }
  };

  unfollow = (followeeId) => {
    axios
      .put(`http://localhost:9000/user/following/${this.props.user.id}`, {
        id: followeeId,
        remove: true,
      })
      .then((res) => {
        // this.props.fetchSelectedUser(res.data.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  getButtonIcon = () => {
    const buttonText = this.props.selectedUser.followers.includes(
      this.props.user.id
    )
      ? "Following"
      : "Follow";
    switch (buttonText) {
      case "Follow":
        return <PersonAddIcon />;
      case "Following":
        return <GroupIcon />;
      default:
        return null;
    }
  };

  render() {
    const { user, selectedUser } = this.props;

    if (selectedUser._id !== user.id) {
      return (
        <div>
          <UnfollowDialog
            handleUnfollow={() => this.unfollow(selectedUser._id)}
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            endIcon={this.getButtonIcon()}
            onClick={() => this.performAction(selectedUser._id)}
          >
            {selectedUser.followers.includes(user.id) ? "Following" : "Follow"}
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedUser: state.selectedUser,
  unfollowDialog: state.unfollowDialog,
});

const mapDispatchToProps = {
  confirmUnfollowDialog,
  fetchSelectedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
