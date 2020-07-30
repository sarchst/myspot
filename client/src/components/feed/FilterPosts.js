import React from "react";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { changeFilter } from "../../app/actions/filterActions";

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
    const { myFilter } = e.currentTarget.dataset;
    console.log(myFilter);
    this.props.changeFilter(myFilter);
  };

//   getButtonLabel = (page) => {
//     if (page === "FEED") {
//       return "Filter: " + this.props.feedFilter;
//     } else {
//       return "Filter: " + this.props.profileFeedFilter;
//     }
//   };

  render() {
    const { page } = this.props;
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
          {page === "FEED" && "Filter: " + this.props.feedFilter}
          {page === "PROFILE" && "Filter: " + this.props.profileFeedFilter}
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
          <MenuItem
            data-my-filter={"newToOld" + page}
            onClick={(e) => this.handleClose(e)}
          >
            <Typography variant="caption">Newest to Oldest</Typography>
          </MenuItem>
          <MenuItem
            data-my-filter={"oldToNew" + page}
            onClick={(e) => this.handleClose(e)}
          >
            <Typography variant="caption">Oldest to Newest</Typography>
          </MenuItem>
          <MenuItem
            data-my-filter={"mostLiked" + page}
            onClick={(e) => this.handleClose(e)}
          >
            <Typography variant="caption">Most Liked</Typography>
          </MenuItem>
          <MenuItem
            data-my-filter={"mostCommented" + page}
            onClick={(e) => this.handleClose(e)}
          >
            <Typography variant="caption">Most Commented</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  feedFilter: state.feed.filter,
  profileFeedFilter: state.profileFeed.filter,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { changeFilter })
)(FilterPosts);
