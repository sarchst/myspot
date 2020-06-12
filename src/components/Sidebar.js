import React from "react";
import clsx from "clsx";
import Post from "./Post";
import Playlists from "./Playlists";

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
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import FavoriteIcon from "@material-ui/icons/Favorite";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleSidebar } from "../app/actions";
import contentType from "../data/ContentTypeEnum";
// import ProfilePage from "./content-page/ProfilePage";
// import FeedPage from "./content-page/FeedPage";
// import HomePage from "./content-page/HomePage";

import { Link, Route, Switch } from "react-router-dom";
import Followers from "./Followers";
import Following from "./Following";
import NowPlaying from "./NowPlaying";
import ProfilePage from "./content-page/ProfilePage";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleDrawerClose = () => {
    this.props.toggleSideBar();
  };

  // This is only temporary and will need to be switched over to redux global state
  selectView = (text) => {
    this.setState({ viewPage: text });
  };

  getSidebarIcon = (text) => {
    switch (text) {
      case contentType.LISTENINGTO:
        return <PlayCircleFilledIcon />;
      case contentType.PLAYLISTS:
        return <QueueMusicIcon />;
      case contentType.POSTS:
        return <AudiotrackIcon />;
      case contentType.FOLLOWERS:
        return <MicIcon />;
      case contentType.FOLLOWING:
        return <HeadsetIcon />;
      case contentType.FAVOURITES:
        return <FavoriteIcon />;
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

          {/*TODO: EITHER map username separately so it doesn't collide with other keywords OR block keywords from being used as username*/}
          <List>
            {/* <ListItem>
              <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
              {/* <AccountCircleIcon/> */}
            {/* <ListItemText primary={this.props.username} /> */}
            {/* </ListItem> */}
            {[
              this.props.username,
              contentType.LISTENINGTO,
              contentType.POSTS,
              contentType.PLAYLISTS,
              contentType.FOLLOWERS,
              contentType.FOLLOWING,
            ].map((text, index) => (
              <ListItem button key={text} onClick={() => this.selectView(text)}>
                <ListItemIcon>{this.getSidebarIcon(text)}</ListItemIcon>
                <Link to={"/" + this.props.username + "/" + text.toLowerCase()}>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[contentType.FAVOURITES].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{this.getSidebarIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/:user/posts/">
              <Post />
            </Route>
            <Route path="/:user/playlists">
              <Playlists />
            </Route>
            <Route path="/:user/followers">
              <Followers />
            </Route>
            <Route path="/:user/following">
              <Following />
            </Route>
            <Route path="/:user/what i'm listening to">
              <NowPlaying />
            </Route>
            <Route path={"/:user"}>
              <ProfilePage />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.isSidebarOpen,
    username: state.userName,
    selectedContentPage: state.selectedContentPage,
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
