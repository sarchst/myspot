import React from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core";
import {logOut, selectContentPage, toggleSidebar} from '../app/actions';
import contentType from "../data/ContentTypeEnum";
import { connect } from "react-redux";
import { toggleSidebar } from "../app/actions";

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
    marginLeft: 50,
    fontSize: 15,
  },
  appTitle: {
    fontSize: 25,
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


class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleDrawerOpen = () => {
    this.props.toggleSidebar();
  };

    logOut = () => {
        this.props.logOut();
    }

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
          <Typography noWrap className={classes.appTitle}>
            MySpot
          </Typography>
                    <Button className={classes.appbarButton} color="inherit" onClick={() => this.props.selectContentPage(contentType.PROFILE)}>
                        {contentType.PROFILE}
          </Button>
                    <Button className={classes.appbarButton} color="inherit" onClick={() => this.props.selectContentPage(contentType.FEED)}>
                        {contentType.FEED}
                    </Button>
                    <Button className={classes.appbarButton} color="inherit" onClick={this.logOut}>
                        Logout
          </Button>

                      <Button color="inherit" className={classes.appbarButton}>
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.isSidebarOpen,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
        logOut: () => dispatch(logOut()),
        selectContentPage: (contentType) => dispatch(selectContentPage(contentType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Appbar));