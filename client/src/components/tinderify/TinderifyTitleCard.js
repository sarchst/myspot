import React, { Fragment } from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import FriendsDiscoverWeekly from "./FriendsDiscoverWeekly";

import "pure-react-carousel/dist/react-carousel.es.css";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { Paper, Tab, Tabs } from "@material-ui/core";
import MaterialTable from "material-table";
import MusicBrowser from "./MusicBrowser";

const styles = (theme) => ({
  audioPlayer: {
    width: "50%",
  },
  profileCardBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const spotifyWebApi = new Spotify();

class TinderifyTitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: false,
      otherUser: false,
      user_ID: "",
    };
  }

  componentDidMount() {
    let user_ID;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.user_ID
    ) {
      console.log("IN ANOTHER USERS TINDERIFY!!!", user_ID);
      this.setState({
        otherUser: true,
        user_ID: this.props.location.state.user_ID,
      });
    } else {
      console.log("it me", user_ID);
      this.setState({
        otherUser: false,
        user_ID: this.props.user.id,
      });
    }
  }

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
      return <MusicBrowser></MusicBrowser>;
    } else {
      return <FriendsDiscoverWeekly></FriendsDiscoverWeekly>;
    }
  };

  render() {
    const { classes } = this.props;
    console.log("hehe", this.user_ID);
    return (
      <div>
        <div>
          <h1 className="tinderify-title">Tinderify</h1>

          {this.state.otherUser ? (
            <MusicBrowser user_ID={this.state.user_ID}></MusicBrowser>
          ) : (
            <Fragment>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Swipe through your Discover Weekly playlist and like songs to
                add to your Favourites!
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
                  <Tab label="Browse My Friends" />
                </Tabs>
                {this.getPanel(this.state.tabIndex)}
              </Paper>
            </Fragment>
          )}
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

export default connect(mapStateToProps)(withStyles(styles)(TinderifyTitleCard));
