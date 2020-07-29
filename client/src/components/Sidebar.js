import React from "react";
import clsx from "clsx";
// import Post from "./Post";
import Playlists from "./Playlists";
import Albums from "./Albums";
import Tinderify from "./Tinderify";
import Favourites from "./Favourites";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import FavoriteIcon from "@material-ui/icons/Favorite";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import AlbumIcon from "@material-ui/icons/Album";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleSidebar } from "../app/actions";
import contentType from "../data/ContentTypeEnum";


import { Link, Route, Switch, Redirect } from "react-router-dom";

import FollowTable from "./FollowTable";
import NowPlaying from "./NowPlaying";
import Profile from "./profile/Profile";
import Feed from "./feed/Feed";
import Settings from "./Settings";
import SongList from "./SongList";
import ProfileCard from "./profile/ProfileCard";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    textDecoration: "none",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarItem: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
});

class Sidebar extends React.Component {
  handleDrawerClose = () => {
    this.props.toggleSideBar();
  };

  // This is only temporary and will need to be switched over to redux global state
  // selectView = (text) => {
  //   this.setState({ viewPage: text });
  // };

  getSidebarIcon = (text) => {
    switch (text) {
      case contentType.LISTENINGTO:
        return <PlayCircleFilledIcon />;
      case contentType.PLAYLISTS:
        return <QueueMusicIcon />;
      case contentType.ALBUMS:
        return <AlbumIcon />;
      case contentType.FOLLOWERS:
        return <MicIcon />;
      case contentType.FOLLOWING:
        return <HeadsetIcon />;
      case contentType.FAVOURITES:
        return <FavoriteIcon />;
      case contentType.TINDERIFY:
        return <WhatshotIcon />;
      default:
        return <AccountCircleIcon />;
    }
  };

  processTextForURL = (text) => {
    if (text === contentType.LISTENINGTO) {
      return "whatimlisteningto";
    }
    return text.toLowerCase();
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.props.open,
            [classes.drawerClose]: !this.props.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.props.open,
              [classes.drawerClose]: !this.props.open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          {/*TODO: EITHER map username separately so it doesn't collide with other keywords OR block keywords from being used as username
          LEFT THIS cause Im not sure if its better now?*/}
          <List>
            <ListItem
              button
              key={this.props.user.username}
              // onClick={() => this.selectView(this.props.username)}
            >
              <Link
                className={classes.sidebarItem}
                to={"/" + this.props.user.username}
              >
                <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                <ListItemText
                  primary={this.props.user.username}
                  color="inhereit"
                />
              </Link>
            </ListItem>

            {[
              contentType.LISTENINGTO,
              contentType.ALBUMS,
              contentType.PLAYLISTS,
              contentType.FOLLOWERS,
              contentType.FOLLOWING,
              contentType.FAVOURITES,
              contentType.TINDERIFY,
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                // onClick={() => this.selectView(text)}
              >
                <Link
                  className={classes.sidebarItem}
                  to={
                    "/" +
                    this.props.user.username +
                    "/" +
                    this.processTextForURL(text)
                  }
                >
                  <ListItemIcon>{this.getSidebarIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={"/:user"} exact>
              <Profile />
            </Route>
            <Route path="/:user/posts">
              <Feed />
            </Route>
            <Route path="/:user/albums" exact>
              <Albums />
            </Route>
            <Route path="/:user/tinderify" exact>
              <Tinderify />
            </Route>
            <Route path="/:user/favourites" exact>
              <Favourites />
            </Route>
            <Route path="/:user/playlists" exact>
              <Playlists />
            </Route>
            <Route key="followers" exact path="/:user/followers">
              <FollowTable type={"followers"} />
            </Route>
            <Route key="following" exact path="/:user/following">
              <FollowTable type={"following"} />
            </Route>
            <Route path="/:user/whatimlisteningto">
              <NowPlaying />
            </Route>
            <Route
              path="/myspotter/:user"
              render={(props) => {
                console.log("props in profilecard is");
                console.log(props);
                return <ProfileCard {...props} />;
              }}
            />
            <Route path="/:user/feed">
              <Feed />
            </Route>
            <Route path="/:user/settings">
              <Settings />
            </Route>
            <Route
              path="/:user/playlists/:playlistid"
              render={(props) => <SongList {...props} />}
            />
            <Route
              render={() => <Redirect to={"/" + this.props.user.username} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.isSidebarOpen,
    user: state.user,
    // selectedContentPage: state.selectedContentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBar: () => dispatch(toggleSidebar()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Sidebar));
