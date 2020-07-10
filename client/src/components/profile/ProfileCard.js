// modified from Siriwatknp at https://mui-treasury.com/components/card/

import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as palette from "@material-ui/core/colors";
import Spotify from "spotify-web-api-js";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = (theme) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
  profileCardBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

const spotifyWebApi = new Spotify();

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topTracks: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }
  componentDidMount = () => {
    console.log(this.props.spotifyWebApi);
    spotifyWebApi
      .getMyTopTracks()
      .then((result) => {
        console.log(result);
        this.setState({
          topTracks: result.items.slice(0, 3),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
      // className={cx(styles.card, shadowStyles.root)}
      >
        <CardContent className={classes.profileCardBox}>
          <Avatar
            className={classes.avatar}
            src={
              this.props.spotifyApiUserMe.images.length
                ? this.props.spotifyApiUserMe.images[0].url
                : "./generic-user-headphone-icon.png"
            }
            // src={"https://i.pravatar.cc/300"}
          />
          <h3 className={classes.heading}>
            {this.props.spotifyApiUserMe.display_name}
          </h3>
          <span className={classes.subheader}>
            {this.props.spotifyApiUserMe.country}
          </span>
        </CardContent>
        <Divider light />
        <Box display={"flex"}>
          <Box
            className={classes.profileCardBox}
            p={2}
            flex={"auto"}
            // className={borderedGridStyles.item}
          >
            <p className={classes.statLabel}>Followers on Spotify</p>
            <p className={classes.statValue}>
              {this.props.spotifyApiUserMe.followers.total}
            </p>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            className={classes.profileCardBox}
            p={2}
            flex={"auto"}
            // className={borderedGridStyles.item}
          >
            <p className={classes.statLabel}>Following</p>
            <p className={classes.statValue}>12</p>
          </Box>
        </Box>
        <Divider light />
        <List
          className={classes.listRoot}
          dense={true}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              My Top Tracks
            </ListSubheader>
          }
        >
          {this.state.topTracks.map((track) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={track.album.images[0].url}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={track.name} secondary={track.album.name} />
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  spotifyWebApi: state.spotifyWebApi,
  spotifyApiUserMe: state.spotifyApiUserMe,
  posts: state.posts,
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileCard));
