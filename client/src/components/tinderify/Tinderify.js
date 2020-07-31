import React, { Fragment } from "react";
import { connect } from "react-redux";
import FriendsDiscoverWeekly from "./FriendsDiscoverWeekly";
import "pure-react-carousel/dist/react-carousel.es.css";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tab, Tabs } from "@material-ui/core";
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

class Tinderify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      otherUser: false,
      user_ID: "",
      username: "",
    };
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.user_ID
    ) {
      this.setState({
        otherUser: true,
        user_ID: this.props.location.state.user_ID,
        username: this.props.location.state.username,
      });
    } else {
      this.setState({
        otherUser: false,
        user_ID: this.props.user.id,
      });
    }
  }

  handleChange = (event, index) => {
    this.setState({ tabIndex: index });
  };

  getPanel = (index) => {
    if (index === 0) {
      return <MusicBrowser></MusicBrowser>;
    } else {
      return <FriendsDiscoverWeekly></FriendsDiscoverWeekly>;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <h1 className="tinderify-title">
            {this.state.otherUser ? this.state.username + "'s " : ""} Tinderify
          </h1>

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
                  <Tab label="Browse" />
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

export default connect(mapStateToProps)(withStyles(styles)(Tinderify));
