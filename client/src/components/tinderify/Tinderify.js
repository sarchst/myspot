import React, { Fragment } from "react";
import { connect } from "react-redux";
import FriendsDiscoverWeekly from "./FriendsDiscoverWeekly";
import "pure-react-carousel/dist/react-carousel.es.css";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tab, Tabs } from "@material-ui/core";
import MusicBrowser from "./MusicBrowser";
import TinderifyPlaylist from "./TinderifyPlaylist";

const styles = (theme) => ({
  root: {
    borderRadius: 16,
  },
  audioPlayer: {
    width: "50%",
  },
  profileCardBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Tinderify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  handleChange = (event, index) => {
    this.setState({ tabIndex: index });
  };

  getPanel = (index) => {
    if (index === 0) {
      return <MusicBrowser></MusicBrowser>;
    } else if (index === 1) {
      return <FriendsDiscoverWeekly></FriendsDiscoverWeekly>;
    } else {
      return <TinderifyPlaylist></TinderifyPlaylist>;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <h1 className="tinderify-title">Tinderify</h1>
          <Fragment>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Swipe through your Discover Weekly playlist and like songs to add
              to your MySpot-Tinderify playlist!
            </Typography>
            <Paper className={classes.root}>
              {/* <TabContext value={this.state.tabIndex}> */}
              <Tabs
                value={this.state.tabIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="My Discover Weekly" />
                <Tab label="Browse Friends Music" />
                <Tab label="My Tinderify Playlist" />
              </Tabs>
              {this.getPanel(this.state.tabIndex)}
            </Paper>
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyWebApi: state.spotifyWebApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Tinderify));
