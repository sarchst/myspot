import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import FollowTable from "../FollowTable";

import MaterialTable from "material-table";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: false,
      playlists: [],
      followers: [],
      following: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount = () => {
    console.log("profile table props", this.props);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update state playlists when tab is clicked for the first time for selectedUser
    // conso
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
      prevProps.selectedUser === this.props.selectedUser
    );

  transformPlaylistData = (data) => {
    const playlists = data.items.map((pl) => {
      const playlist = {
        title: pl.name,
        playlistArt: pl.images.length ? pl.images[0].url : "",
        owner: pl.owner.display_name,
        numTracks: pl.tracks.total,
      };
      return playlist;
    });
    return playlists;
  };

  fetchSpotifyPlaylists = () => {
    spotifyWebApi
      .getUserPlaylists(this.props.selectedUser._id)
      .then((result) => {
        const playlists = this.transformPlaylistData(result);
        this.setState({
          playlists: playlists,
        });
      })
      .catch((err) => {
        console.log("Error getting top tracks: ", err);
      });
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
        <FollowTable
          key={this.state.tabIndex}
          type={this.state.tabIndex === 1 ? "followers" : "following"}
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
  spotifyApi: state.spotifyApi,
  user: state.user,
  selectedUser: state.selectedUser,
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileTable));
