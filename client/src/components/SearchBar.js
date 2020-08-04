import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { setSelectedUser } from "../app/actions/selectedUserActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";



const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
});

class SearchBar extends React.Component {
  state = {
    query: "",
    user: {},
    errorSnackOpen: false,
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      errorSnackOpen: false,
    });
  };

  handleSearch = () => {
    fetch(`http://localhost:9000/user/username/${this.state.query}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        if (res.data) {
          this.props.setSelectedUser(res.data);
          this.setState({ user: res.data });
        } else {
          this.setState({
            errorSnackOpen: true,
          });
        }
        this.setState({ user: {} });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorSnackOpen: true,
        });
      })
      .finally(() => {
        this.setState({ query: "" });
      });
  };

  render() {
    const { classes } = this.props;
    return this.state.user && this.state.user.username ? (
      <Redirect to={`/${this.state.user._id}`} />
    ) : (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for a user…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          // uncomment to clear text input on search
          // value={this.state.query}
          inputProps={{ "aria-label": "search" }}
          onChange={this.handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.handleSearch();
            }
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.errorSnackOpen}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
        >
          <Alert onClose={() => this.handleClose()} severity="error">
            Hmm...That user doesn't seem to exist!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSelectedUser,
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(SearchBar);
