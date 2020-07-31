import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleLike } from "../../app/actions/feedActions";
import { fetchPosts } from "../../app/actions/postActions";
import Post from "../feed/Post";
import MakePost from "../feed/MakePost";
import ProfileCard from "./ProfileCard";
import ProfileTable from "./ProfileTable";
import { fetchUserSettings } from "../../app/actions/settingsActions";
import { fetchProfilePic } from "../../app/actions/imageUploadActions";
import DeletePostDialog from "../feed/DeletePostDialog";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    // margin: theme.spacing(2, 0),
    color: theme.palette.primary,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    const { match } = this.props;
    this.props.fetchSelectedUser(match.params.user);
    this.props.fetchPosts(match.params.user);
    this.props.fetchUserSettings(match.params.user);
    this.props.fetchProfilePic(match.params.user);
  };

  render() {
    const { classes, user, toggleLike } = this.props;
    return (
      <div className={classes.root}>
        <DeletePostDialog />
        <ProfileCard />
        <ProfileTable />
        <MakePost />
        <div>
          {/*this.props.selectedUser && this.props.selectedUser.posts && this.props.selectedUser.posts.length*/}
          {this.props.posts && this.props.posts.length ? (
            // ALSO this could be a Feed component potentially with a is profile feed prop or something, not front burner issue though
            this.props.posts.map((p) => (
              <Post
                key={p._id}
                postdata={p}
                toggleLike={() => toggleLike(p, user.id)}
                userId={user.id}
              />
            ))
          ) : (
            <h3 color="primary">Hmm..no posts yet. You should make one!</h3>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
  selectedUser: state.selectedUser,
});

const mapDispatchToProps = {
  toggleLike,
  fetchPosts,
  fetchUserSettings,
  fetchProfilePic,
  fetchSelectedUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
