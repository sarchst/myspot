import React from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SearchBar from "./SearchBar";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core";
import { logOut, toggleSidebar } from "../app/actions";
import contentType from "../data/ContentTypeEnum";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSelectedUser } from "../app/actions/selectedUserActions";
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

  appbarButton: {
    marginLeft: 25,
    marginRight: 25,
    // marginLeft: 50,
    fontSize: 16,
    textDecoration: "none",
    color: "white",
  },
  appTitle: {
    display: "flex",
    fontSize: 25,
    flexShrink: 1,
  },
  hide: {
    display: "none",
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

class Appbar extends React.Component {
  handleDrawerOpen = () => {
    this.props.toggleSidebar();
  };

  logOut = () => {
    this.props.logOut();
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.props.open,
        })}
      >
        
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.props.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography noWrap={false} className={classes.appTitle} variant="h1">
              MySpot
            </Typography>
            <Link
              to={"/" + this.props.user.id}
              style={{ textDecoration: "none" }}
              // className={classes.appbarButton}
              onClick={() => this.props.fetchSelectedUser(this.props.user.id)}
            >
              <Button className={classes.appbarButton} color="inherit">
                {contentType.PROFILE}
              </Button>
            </Link>
            <Link
              to={"/" + this.props.user.id + "/feed"}
              style={{ textDecoration: "none" }}
            >
              <Button className={classes.appbarButton} color="inherit">
                {contentType.FEED}
              </Button>
            </Link>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                className={classes.appbarButton}
                color="inherit"
                onClick={this.logOut}
              >
                Log Out
              </Button>
            </Link>

            <Link
              to={"/" + this.props.user.username + "/settings"}
              className={classes.appbarButton}
            >
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Link>
            <SearchBar />
          </Toolbar>
      </AppBar>
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
  logOut,
  fetchSelectedUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Appbar));
