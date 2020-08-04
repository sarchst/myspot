import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { confirmUnfollowDialog } from "../../app/actions";
import { setSelectedUser } from "../../app/actions/selectedUserActions";

import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupIcon from "@material-ui/icons/Group";
import UnfollowDialog from "./UnfollowDialog";

class FollowButton extends React.Component {
  state = {
    buttonText: this.props.selectedUserFollowers.includes(this.props.user.id)
      ? "Following"
      : "Follow",
  };

  performAction = (followeeId) => {
    if (this.state.buttonText === "Follow") {
      axios
        .put(`http://localhost:9000/user/following/${this.props.user.id}`, {
          id: followeeId,
          remove: false,
        })
        .then((res) => {
          if (this.props.isProfileCall) {
            this.props.setSelectedUser(res.data.data);
          } else if (this.props.isFollowingTable) {
            this.followTableCallback();
          } else {
            this.setState({ buttonText: "Following" });
          }
        })
        .catch((error) => {
          throw error;
        });
    } else if (this.state.buttonText === "Following") {
      const payload = {
        open: this.props.unfollowDialog.open,
        username: this.props.selectedUsername,
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
        if (this.props.isProfileCall) {
          this.props.setSelectedUser(res.data.data);
        } else if (this.props.isFollowingTable) {
          this.props.followTableCallback();
        } else {
          this.setState({ buttonText: "Follow" });
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  getButtonIcon = () => {
    switch (this.state.buttonText) {
      case "Follow":
        return <PersonAddIcon />;
      case "Following":
        return <GroupIcon />;
      default:
        return null;
    }
  };

  render() {
    const { user, selectedUserId } = this.props;

    if (selectedUserId !== user.id) {
      return (
        <div>
          <UnfollowDialog
            handleUnfollow={() => this.unfollow(selectedUserId)}
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            endIcon={this.getButtonIcon()}
            onClick={() => this.performAction(selectedUserId)}
          >
            {this.state.buttonText}
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
  unfollowDialog: state.unfollowDialog,
});

const mapDispatchToProps = {
  confirmUnfollowDialog,
  setSelectedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
