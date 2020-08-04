import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import Albums from "./Albums";
import Favourites from "./Favourites";
import Feed from "./feed/Feed";
import FollowTable from "./follow/FollowTable";
import Playlists from "./Playlists";
import Profile from "./profile/Profile";
import Settings from "./Settings";
import SongList from "./SongList";
import Tinderify from "./tinderify/Tinderify";
import contentType from "../data/ContentTypeEnum";
import { toggleSidebar } from "../app/actions";
import { fetchSelectedUser } from "../app/actions/selectedUserActions";

import {
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { fetchUserSettings } from "../app/actions/settingsActions";
import { fetchProfilePic } from "../app/actions/imageUploadActions";

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

  componentDidMount = () => {
    this.props.fetchProfilePic(this.props.user.id);
    this.props.fetchUserSettings(this.props.user.id);
  };

  getSidebarIcon = (text) => {
    switch (text) {
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
        return <WhatshotIcon style={{ color: "#e56b9e" }} />;
      default:
        return <AccountCircleIcon />;
    }
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
          <List>
            <ListItem button key={this.props.user.username}>
              <Link
                className={classes.sidebarItem}
                to={"/" + this.props.user.id}
                onClick={() => {
                  this.props.fetchSelectedUser(this.props.user.id);
                }}
              >
                <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                <ListItemText
                  primary={this.props.user.username}
                  color="inhereit"
                />
              </Link>
            </ListItem>

            {[
              contentType.FAVOURITES,
              contentType.PLAYLISTS,
              contentType.ALBUMS,
              contentType.FOLLOWERS,
              contentType.FOLLOWING,
              contentType.TINDERIFY,
            ].map((text, index) => (
              <ListItem button key={text}>
                <Link
                  className={classes.sidebarItem}
                  to={"/" + this.props.user.id + "/" + text.toLowerCase()}
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
            <Route path="/:user" exact component={Profile} />
            <Route path="/:user/posts" component={Feed} />
            <Route path="/:user/albums" exact component={Albums} />
            <Route path="/:user/tinderify" exact component={Tinderify} />
            <Route path="/:user/favourites" exact component={Favourites} />
            <Route path="/:user/playlists" exact component={Playlists} />
            <Route
              path="/myspotter/:user/playlists"
              exact
              render={(props) => {
                return <Playlists {...props} />;
              }}
            />
            <Route
              key="followers"
              exact
              path="/:user/followers"
              component={(props) => (
                <div>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Followers
                  </Typography>
                  <FollowTable type={"followers"} inProfileTable={false} />
                </div>
              )}
            />
            <Route
              key="following"
              exact
              path="/:user/following"
              component={(props) => (
                <div>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Following
                  </Typography>
                  <FollowTable type={"following"} inProfileTable={false} />
                </div>
              )}
            />
            <Route path="/:user/feed" component={Feed} />
            <Route path="/:user/settings" component={Settings} />
            <Route
              path="/:user/playlists/:playlistid"
              render={(props) => <SongList {...props} />}
            />
            <Route
              exact
              path="/:user/albums/:albumid"
              render={(props) => <SongList {...props} />}
            />
            <Route render={() => <Redirect to={"/" + this.props.user.id} />} />
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
  };
};

const mapDispatchToProps = {
  toggleSidebar,
  fetchSelectedUser,
  fetchUserSettings,
  fetchProfilePic,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Sidebar));
