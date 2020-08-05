import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import FollowTable from "../follow/FollowTable";

import MaterialTable from "material-table";
import { Button, Paper, Snackbar, Tab, Tabs } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 16,
    // margin: 5,
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

const spotifyWebApi = new Spotify();

class ProfileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: false,
      playlists: [],
      followers: [],
      following: [],
      successSnackOpen: false,
      errorSnackOpen: false,
      containsSnackOpen: false,
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update state playlists when tab is clicked for the first time for selectedUser
    if (
      this.isTabIndexUpdatedToZero(prevState) &&
      (!this.state.playlists.length || this.isSelectedUserUpdated(prevProps))
    ) {
      this.fetchSpotifyPlaylists();
    }

    // collapse profile table and wipe state playlists when selectedUser updates
    if (this.isSelectedUserUpdated(prevProps)) {
      this.setState({
        tabIndex: false,
        playlists: [],
      });
    }
  }

  isTabIndexUpdatedToZero = (prevState) =>
    this.state.tabIndex === 0 && this.state.tabIndex !== prevState.tabIndex;

  isSelectedUserUpdated = (prevProps) =>
    !(
      prevProps.selectedUser &&
      this.props.selectedUser &&
      prevProps.selectedUser._id === this.props.selectedUser._id
    );

  transformPlaylistData = async (data) => {
    return Promise.all(
      data.map(async (pl) => {
        const playlist = await spotifyWebApi.getPlaylist(pl.id);
        const playlistObj = {
          title: pl.name,
          playlistArt: pl.images.length
            ? pl.images[0].url
            : "https://res.cloudinary.com/dafyfaoby/image/upload/v1595367319/mcbvhgkwezvngrxg3uac.jpg",
          owner: pl.owner.display_name,
          numTracks: pl.tracks.total,
          playlistID: pl.id,
          playlistDescription: pl.description,
          numFollowers: playlist.followers.total,
        };
        return playlistObj;
      })
    ).catch((err) => {
      console.error("error getting selected user's playlists: ", err);
    });
  };

  fetchSpotifyPlaylists = async () => {
    let allPlaylists = [];
    let offset = 0;
    let playlists = await spotifyWebApi.getUserPlaylists(
      this.props.selectedUser._id,
      {
        limit: 50,
        offset: offset,
      }
    );
    while (playlists.items.length !== 0) {
      allPlaylists.push(...playlists.items);
      offset += 50;
      playlists = await spotifyWebApi.getUserPlaylists(
        this.props.selectedUser._id,
        {
          limit: 50,
          offset: offset,
        }
      );
    }
    this.transformPlaylistData(allPlaylists).then((playlists) => {
      this.setState({
        playlists: playlists,
      });
    });
  };

  addPlaylistToLibrary = (id) => {
    spotifyWebApi
      .areFollowingPlaylist([id], [this.props.user.id])
      .then((res) => {
        if (res[0]) {
          return false;
        } else {
          return spotifyWebApi.followPlaylist(id);
        }
      })
      .then((res) => {
        if (res === "") {
          this.setState({
            successSnackOpen: true,
          });
        } else {
          this.setState({
            containsSnackOpen: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          errorSnackOpen: true,
        });
        console.log("error adding playlist to library: ", err);
      });
  };

  handleChange = (event, index) => {
    if (index === this.state.tabIndex) {
      this.setState({ tabIndex: false });
    } else {
      this.setState({ tabIndex: index });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      successSnackOpen: false,
      containsSnackOpen: false,
      errorSnackOpen: false,
    });
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
                <Link
                  to={{
                    pathname: `/${this.props.selectedUser._id}/playlists/${rowData.playlistID}`,
                    state: {
                      playlistName: rowData.title,
                      playlistDescription: rowData.playlistDescription,
                    },
                  }}
                >
                  <img
                    src={rowData.playlistArt}
                    alt={"Playlist Art"}
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
              field: "title",
              render: (rowData) => (
                <Link
                  to={{
                    pathname: `/${this.props.selectedUser._id}/playlists/${rowData.playlistID}`,
                    state: {
                      playlistName: rowData.title,
                      playlistDescription: rowData.playlistDescription,
                    },
                  }}
                  className={this.props.classes.link}
                >
                  {rowData.title}
                </Link>
              ),
            },
            { title: "# of Tracks", field: "numTracks" },
            { title: "# of Followers", field: "numFollowers" },
            { title: "Owner", field: "owner" },
            {
              title: "",
              field: "playlistID",
              render: (rowData) =>
                this.props.user.id === this.props.selectedUser._id ||
                rowData.title === "MySpot" ||
                rowData.title === "MySpot-Tinderify" ? null : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    endIcon={<LibraryAddIcon />}
                    onClick={() =>
                      this.addPlaylistToLibrary(rowData.playlistID)
                    }
                  >
                    Add Playlist
                  </Button>
                ),
            },
          ]}
          data={this.state.playlists}
          options={{
            showTitle: false,
            search: false,
            paging: false,
            toolbar: false,
            sorting: false,
            draggable: false,
          }}
        />
      );
    } else {
      return (
        <FollowTable
          key={this.state.tabIndex}
          type={this.state.tabIndex === 1 ? "followers" : "following"}
          profileTableCallback={() => this.setTabIndex(false)}
          inProfileTable={true}
        />
      );
    }
  };

  setTabIndex = (index) => {
    this.setState({ tabIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
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
        <Snackbar
          open={this.state.successSnackOpen}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
        >
          <Alert onClose={() => this.handleClose()} severity="success">
            Playlist was added to your library.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.containsSnackOpen}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
        >
          <Alert onClose={() => this.handleClose()} severity="info">
            This Playlist is already in your library.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.errorSnackOpen}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
        >
          <Alert onClose={() => this.handleClose()} severity="error">
            Error adding selected Playlist.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  spotifyApi: state.spotifyApi,
  user: state.user,
  selectedUser: state.selectedUser,
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileTable));
