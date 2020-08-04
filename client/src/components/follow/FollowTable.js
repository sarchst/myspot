import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";
import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { fetchSelectedUser } from "../../app/actions/selectedUserActions";

const styles = (theme) => ({
  root: {
    borderRadius: 16,
    borderTopRadius: 16,
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
    fetch(`http://localhost:9000/user/${type}/${this.props.selectedUser._id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const following = this.transformFollowData(res.data[0][type]);
        this.setState({ followList: following });
      })
      .catch((error) => {
        console.log("Fetch Follow Error: ", error);
      });
  };

  transformFollowData = (data) => {
    const follData = data.map((f) => {
      const foll = {
        pic: f.profilePic,
        username: f.username,
        numPosts: f.posts.length,
        numFollowers: f.followers.length,
        userId: f._id,
      };
      return foll;
    });
    return follData;
  };

  render() {
    const { classes, type } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {type === "following"? "Following": "Followers"}
        </Typography>
        <MaterialTable
          className={classes.root}
          components={{
            Container: (props) => (
              <Paper
                {...props}
                elevation={0}
                style={{ boxShadow: 0, borderRadius: 16 }}
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
                  <img
                    src={rowData.pic}
                    alt={"ProfilePic"}
                    style={{ width: 40, height: 40 }}
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
            { title: "# of Posts", field: "numPosts" },
            { title: "# of Followers", field: "numFollowers" },
          ]}
          data={this.state.followList}
          options={{
            showTitle: false,
            search: false,
            paging: false,
            toolbar: false,
            sorting: false,
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
