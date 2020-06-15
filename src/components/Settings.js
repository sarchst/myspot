import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    fontSize: 25,
    margin: theme.spacing(2, 0),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  profilePic: {
    fontSize: 90,
  },
  userdata: {
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
  },
  content: {
    direction: "column",
    justifycontent: "flex-start",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
});

class Settings extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.header}>Account Settings</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid className={classes.userdata} container>
                <AccountCircleIcon className={classes.profilePic} />
                <Grid className={classes.content} item>
                  <Grid item>
                    <Typography>Username: {this.props.username}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Email: associatedEmail@gmail.com</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {/* <Divider className={classes.divider} /> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography>Notifications</Typography>
              </Paper>
            </Grid>
            {/* <Divider className={classes.divider} /> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography>Language</Typography>
              </Paper>
            </Grid>
            {/* <Divider className={classes.divider} /> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography>Disable Account</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Settings)
);
