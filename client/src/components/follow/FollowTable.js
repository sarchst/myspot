import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import Emoji from "react-emoji-render";
import { getName } from "country-list";

import FollowButton from "./FollowButton";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

import { Avatar, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    borderRadius: 16,
    borderTopRadius: 16,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

class FollowTable extends React.Component {
  state = {
    followList: [],
  };
  componentDidMount = () => {
    this.fetchFollowPeople();
  };

  fetchFollowPeople = () => {
    const type = this.props.type;
    const id = this.props.inProfileTable
      ? this.props.selectedUser._id
      : this.props.user.id;
    fetch(`http://localhost:9000/user/${type}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const following = this.transformFollowData(res.data[0][type]);
        this.setState({ followList: following });
        this.setState({ followList: following }); // double state call because Follow Button was not rerendering properly
      })
      .catch((error) => {
        console.error("Fetch Follow Error: ", error);
      });
  };

  transformFollowData = (data) => {
    const follData = data.map((f) => {
      const foll = {
        pic: f.profilePic,
        username: f.username,
        numPosts: f.posts.length,
        numFollowers: f.followers.length,
        followers: f.followers,
        userId: f._id,
        country: this.getCountry(f.country),
      };
      return foll;
    });
    return follData;
  };

  getCountry = (country) => {
    if (country === "US") return country.toLocaleLowerCase();
    else return getName(country).toLocaleLowerCase();
  };

  updateTable = () => {
    this.fetchFollowPeople();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MaterialTable
          components={{
            Container: (props) => (
              <Paper
                {...props}
                elevation={0}
                style={{
                  boxShadow: 0,
                  borderRadius: 16,
                  padding: 10,
                }}
              />
            ),
          }}
          columns={[
            {
              title: "MySpotter",
              field: "pic",
              render: (rowData) => (
                <Link
                  to={`/${rowData.userId}`}
                  onClick={() => {
                    this.props.fetchSelectedUser(rowData.userId);
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar
                    src={rowData.pic}
                    alt="profile-pic"
                    style={{ width: 40, height: 40, borderRadius: 16 }}
                  />
                </Link>
              ),
              headerStyle: { width: "50px", borderRadius: 16 },
              cellStyle: { width: "50px" },
              width: null,
            },
            {
              title: "",
              field: "username",
              render: (rowData) => (
                <Link
                  className={this.props.classes.link}
                  to={`/${rowData.userId}`}
                  onClick={() => {
                    this.props.fetchSelectedUser(rowData.userId);
                  }}
                >
                  {rowData.username}
                </Link>
              ),
            },
            {
              title: "Country",
              field: "country",
              render: (rowData) => <Emoji text={":" + rowData.country + ":"} />,
            },
            { title: "# of Posts", field: "numPosts" },
            { title: "# of Followers", field: "numFollowers" },
            {
              title: "",
              field: "follows",
              render: (rowData) => (
                <FollowButton
                  selectedUserId={rowData.userId}
                  selectedUserFollowers={rowData.followers}
                  selectedUsername={rowData.username}
                  isProfileCall={false}
                  isFollowing={rowData.followers.includes(this.props.user.id)}
                  followTableCallback={() => this.updateTable()}
                />
              ),
            },
          ]}
          data={this.state.followList}
          options={{
            showTitle: false,
            search: false,
            paging: false,
            toolbar: false,
            sorting: false,
            draggable: false,
            rowStyle: { borderBottom: 0 },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedUser: state.selectedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectedUser: (userID) => dispatch(fetchSelectedUser(userID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FollowTable));
