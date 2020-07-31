import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
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
    const type = this.props.type;
    fetch(`http://localhost:9000/user/${type}/${this.props.user.id}`)
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
    return (
      <MaterialTable
        components={{
          Container: (props) => (
            <Paper {...props} elevation={0} style={{ boxShadow: 0 }} />
          ),
        }}
        columns={[
          {
            title: "MySpotter",
            field: "pic",
            render: (rowData) => (
              <Link
                to={{
                  pathname: "/myspotter/" + rowData.username,
                  state: {
                    user_ID: rowData.userId,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={rowData.pic}
                  alt={"ProfilePic"}
                  style={{ width: 40, height: 40, borderRadius: 16 }}
                />
              </Link>
            ),
            headerStyle: { width: "50px" },
            cellStyle: { width: "50px" },
            width: null,
          },
          {
            title: "",
            field: "username",
            render: (rowData) => (
              <Link
                className={this.props.classes.link}
                to={{
                  pathname: "/myspotter/" + rowData.username,
                  state: {
                    user_ID: rowData.userId,
                  },
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
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(FollowTable));
