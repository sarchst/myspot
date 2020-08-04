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
    buttonText: this.props.isFollowing ? "Following" : "Follow",
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
            this.setState({ buttonText: "Following" });
          } else {
            this.props.followTableCallback();
          }
        })
        .catch((error) => {
          throw error;
        });
    } else if (this.state.buttonText === "Following") {
      const payload = {
        open: this.props.unfollowDialog.open,
        username: this.props.selectedUsername,
        userId: this.props.selectedUserId,
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
          this.setState({ buttonText: "Follow" });
        } else {
          this.props.followTableCallback();
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
          <UnfollowDialog handleUnfollow={(id) => this.unfollow(id)} />
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
