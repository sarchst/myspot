import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

import MaterialTable from "material-table";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 16,
    // margin: 5,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const spotifyWebApi = new Spotify();

class ProfileTable extends React.Component {
  state = {
    tabIndex: false,
    playlists: [],
    followers: [],
    following: [],
  };
  componentDidMount = () => {
    spotifyWebApi
      .getUserPlaylists(this.props.user.id)
      .then((result) => {
        console.log(result);
        const playlists = this.transformPlaylistData(result);
        this.setState({
          playlists: playlists,
        });
      })
      .catch((err) => {
        console.log("error getting top tracks");
        console.log(err);
      });
    fetch(`http://localhost:9000/user/following/${this.props.user.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        console.log("following res: ", res);
        const following = this.transformFollowData(res.data[0].following);
        this.setState({ following: following });
      })
      .catch((error) => {
        console.log("Fetch Following Error: ", error);
      });
    fetch(`http://localhost:9000/user/followers/${this.props.user.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        console.log("followers res: ", res);
        const followers = this.transformFollowData(res.data[0].followers);
        this.setState({ followers: followers });
      })
      .catch((error) => {
        console.log("Fetch Followers Error: ", error);
      });
  };

  transformPlaylistData = (data) => {
    const playlists = data.items.map((pl) => {
      const playlist = {
        title: pl.name,
        playlistArt: pl.images[0].url,
        owner: pl.owner.display_name,
        numTracks: pl.tracks.total,
      };
      return playlist;
    });
    return playlists;
  };

  transformFollowData = (data) => {
    const follData = data.map((f) => {
      const foll = {
        user_ID: f._id,
        pic: f.profilePic,
        username: f.username,
        numPosts: f.posts.length,
        numFollowers: f.followers.length,
      };
      return foll;
    });
    return follData;
  };

  handleChange = (event, index) => {
    if (index === this.state.tabIndex) {
      this.setState({ tabIndex: false });
    } else {
      this.setState({ tabIndex: index });
    }
  };

  getPanel = (index) => {
    if (this.state.tabIndex === false) return null;
    if (index === 0) {
      return (
        <MaterialTable
          components={{
            Container: (props) => (
              <Paper {...props} elevation={0} style={{ boxShadow: 0 }} />
            ),
          }}
          columns={[
            {
              title: "Playlist",
              field: "playlistArt",
              render: (rowData) => (
                <img
                  src={rowData.playlistArt}
                  alt={"Playlist Art"}
                  style={{ width: 40, height: 40, borderRadius: 16 }}
                />
              ),
              headerStyle: { width: "50px" },
              cellStyle: { width: "50px" },
              width: null,
            },
            { title: "", field: "title" },
            { title: "# of Tracks", field: "numTracks" },
            { title: "Owner", field: "owner" },
          ]}
          data={this.state.playlists}
          options={{
            showTitle: false,
            search: false,
            paging: false,
            toolbar: false,
            sorting: false,
            // headerStyle: { color: "#03DAC6" },
          }}
        />
      );
    } else {
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
                      user_ID: rowData.user_ID,
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
                  to={{
                    pathname: "/myspotter/" + rowData.username,
                    state: {
                      user_ID: rowData.user_ID,
                    },
                  }}
                  style={{ textDecoration: "none", color: "#03DAC6" }}
                >
                  {rowData.username}
                </Link>
              ),
            },
            { title: "# of Posts", field: "numPosts" },
            { title: "# of Followers", field: "numFollowers" },
          ]}
          data={
            this.state.tabIndex === 1
              ? this.state.followers
              : this.state.following
          }
          options={{
            showTitle: false,
            search: false,
            paging: false,
            toolbar: false,
            sorting: false,
            rowStyle: { borderBottom: 0 },
            // headerStyle: { color: "#03DAC6" },
          }}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {/* <TabContext value={this.state.tabIndex}> */}
        <Tabs
          value={this.state.tabIndex}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Playlists" />
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
        {this.getPanel(this.state.tabIndex)}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  spotifyWebApi: state.spotifyWebApi,
  spotifyApiUserMe: state.spotifyApiUserMe,
  posts: state.posts,
  user: state.user,
});

const mapDispatchToProps = {
  // getFollowersAndFollowing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfileTable));
