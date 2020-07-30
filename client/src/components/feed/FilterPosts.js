import React from "react";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { changeFilter } from "../../app/actions/feedActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  MenuItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

class FilterPosts extends React.Component {
  state = {
    anchorE1: null,
    open: false,
  };

  handleClick = (e) => {
    this.setState({ anchorE1: e.currentTarget, open: true });
  };
  handleClose = (e) => {
    this.setState({ anchorE1: null, open: false });
    const { filter } = e.currentTarget.dataset;
    this.props.changeFilter(filter);
  };
  render() {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Filters
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorE1}
          keepMounted
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MenuItem data-my-value={"newToOld"} onClick={this.handleClose}>
            <Typography variant="caption">Newest to Oldest</Typography>
          </MenuItem>
          <MenuItem data-my-value={"oldToNew"} onClick={this.handleClose}>
            <Typography variant="caption">Oldest to Newest</Typography>
          </MenuItem>
          <MenuItem data-my-value={"mostLiked"} onClick={this.handleClose}>
            <Typography variant="caption">Most Liked</Typography>
          </MenuItem>
          <MenuItem data-my-value={"mostCommented"} onClick={this.handleClose}>
            <Typography variant="caption">Most Commented</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { changeFilter })
)(FilterPosts);
