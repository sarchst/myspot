// modified from Siriwatknp at https://mui-treasury.com/components/card/

import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";
import Emoji from "react-emoji-render";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  card: {
    borderRadius: 16,
    minWidth: 256,
    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: "large",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: "small",
    color: theme.palette.secondary.main,
    marginBottom: "0.875em",
    fontWeight: "bold",
  },
  statLabel: {
    // fontSize: "medium",
    // color: palette.grey[500],
    color: theme.palette.primary.main,
    // fontWeight: "bold",
    // fontFamily:
    // '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: "large",
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
  audioPlayer: {
    width: "50%",
  },
  trackheader: {
    fontSize: "medium",
    fontWeight: "bold",
  },
});

const spotifyWebApi = new Spotify();

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topTracks: [],
      recentTracks: [],
      songUri: "",
      userData: {},
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }
  componentDidMount = () => {
    // TODO: replace user_ID with this.props.user_ID once working
    console.log("this props is");
    console.log(this.props);
    console.log("this userid is");
    console.log(this.user_ID);
    let user_ID;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.user_ID
    ) {
      user_ID = this.props.location.state.user_ID;
    } else {
      user_ID = this.props.user.id;
    }
    // get top tracks for arbitrary user
    fetch(`/user/${user_ID}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          topTracks: response.data.topTracks,
          recentTracks: response.data.recentTracks,
          userData: response.data,
        });
      });
    // spotifyWebApi
    //   .getMyTopTracks()
    //   .then((result) => {
    //     // console.log(result);
    //     this.setState({
    //       topTracks: result.items.slice(0, Math.min(result.items.length, 3)),
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error getting top tracks");
    //     console.log(err);
    //   });
    // spotifyWebApi
    //   .getMyRecentlyPlayedTracks()
    //   .then((result) => {
    //     this.setState({
    //       recentTracks: result.items.slice(0, Math.min(result.items.length, 3)),
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error getting recent tracks");
    //     console.log(err);
    //   });
  };

  setPlayerSong = (songUri) => {
    this.setState({
      songUri: songUri,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
        // className={cx(styles.card, shadowStyles.root)}
        className={classes.card}
      >
        <CardContent className={classes.profileCardBox}>
          <Avatar
            className={classes.avatar}
            src={
              // this.props.user.profilePic
              //   ? this.props.user.profilePic
              //   : "./generic-user-headphone-icon.png"
              this.state.userData.profilePic
                ? this.state.userData.profilePic
                : "./generic-user-headphone-icon.png"
            }
            // src={"https://i.pravatar.cc/300"}
          />
          <h3 className={classes.heading}>{this.state.userData.username}</h3>
          <span className={classes.subheader}>
            <Emoji text=":globe_showing_americas:" />
            {/* unfortunately it seems like emoji flags aren't supported for windows10 so can only see it on mac */}
            <Emoji text=":flag_canada:" />
            <Emoji text=":globe_showing_americas:" />
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
            <Typography className={classes.statLabel}>Followers</Typography>
            <p className={classes.statValue}>
              {this.state.userData.followers
                ? this.state.userData.followers.length
                : 0}
            </p>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            className={classes.profileCardBox}
            p={2}
            flex={"auto"}
            // className={borderedGridStyles.item}
          >
            <Typography className={classes.statLabel}>Following</Typography>
            <p className={classes.statValue}>
              {this.state.userData.following
                ? this.state.userData.following.length
                : 0}
            </p>
          </Box>
        </Box>
        <Divider light />
        <Box display={"flex"}>
          <Box
            className={classes.profileCardBox}
            p={2}
            flex={"auto"}
            // className={borderedGridStyles.item}
          >
            <List
              className={classes.listRoot}
              dense={true}
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  color="primary"
                  className={classes.trackheader}
                >
                  <Typography>My Top Tracks</Typography>
                </ListSubheader>
              }
            >
              {this.state.topTracks.map((track, idx) => {
                const isPlaybackAvailable = track.preview_url ? true : false;
                return (
                  <ListItem
                    key={idx}
                    button={isPlaybackAvailable}
                    onClick={
                      isPlaybackAvailable
                        ? () => this.setPlayerSong(track.preview_url)
                        : null
                    }
                  >
                    <Box pr={1} pt={1}>
                      {isPlaybackAvailable ? (
                        <PlayCircleOutlineIcon color={"secondary"} />
                      ) : (
                        <MusicOffOutlinedIcon color={"secondary"} />
                      )}
                    </Box>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={
                          track.album.images.length
                            ? track.album.images[track.album.images.length - 1]
                                .url
                            : null
                        }
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.name}
                      secondary={track.album.artists.map(
                        (artist, idx) =>
                          artist.name +
                          (idx < track.album.artists.length - 1 ? " | " : "")
                      )}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            className={classes.profileCardBox}
            p={2}
            flex={"auto"}
            // className={borderedGridStyles.item}
          >
            <List
              className={classes.listRoot}
              dense={true}
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  color="primary"
                  className={classes.trackheader}
                >
                  <Typography>Recently Played Songs</Typography>
                </ListSubheader>
              }
            >
              {this.state.recentTracks.map((item, idx) => {
                const isPlaybackAvailable = item.track.preview_url
                  ? true
                  : false;
                return (
                  <ListItem
                    key={idx}
                    button={isPlaybackAvailable}
                    onClick={
                      isPlaybackAvailable
                        ? () => this.setPlayerSong(item.track.preview_url)
                        : null
                    }
                  >
                    <Box pr={1} pt={1}>
                      {isPlaybackAvailable ? (
                        <PlayCircleOutlineIcon color={"secondary"} />
                      ) : (
                        <MusicOffOutlinedIcon color={"secondary"} />
                      )}
                    </Box>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={
                          item.track.album.images.length
                            ? item.track.album.images[0].url
                            : null
                        }
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.track.name}
                      secondary={
                        "Played: " + new Date(item.played_at).toLocaleString()
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
        {this.state.songUri ? (
          <Box className={classes.profileCardBox} pb={1}>
            <audio
              className={classes.audioPlayer}
              autoPlay
              controls="controls"
              src={this.state.songUri}
            ></audio>
          </Box>
        ) : null}
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  spotifyWebApi: state.spotifyWebApi,
  spotifyApiUserMe: state.spotifyApiUserMe,
  posts: state.posts,
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileCard));
