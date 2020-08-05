import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import MaterialTable from "material-table";

import FollowTable from "../follow/FollowTable";

import { Paper, Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 16,
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
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.isTabIndexUpdatedToZero(prevState) &&
      (!this.state.playlists.length || this.isSelectedUserUpdated(prevProps))
    ) {
      this.fetchSpotifyPlaylists();
    }
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

  transformPlaylistData = (data) => {
    const playlists = data.map((pl) => {
      const playlist = {
        title: pl.name,
        playlistArt: pl.images.length ? pl.images[0].url : "",
        owner: pl.owner.display_name,
        numTracks: pl.tracks.total,
        playlistID: pl.id,
        playlistDescription: pl.description,
      };
      return playlist;
    });
    return playlists;
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
    const transFormedPlaylists = this.transformPlaylistData(allPlaylists);
    this.setState({
      playlists: transFormedPlaylists,
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
            { title: "Owner", field: "owner" },
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
      <Paper className={classes.root}>
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
  selectedUser: state.selectedUser,
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileTable));
