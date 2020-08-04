import React from "react";
import { connect } from "react-redux";

import ImageUpload from "./ImageUpload";
import { toggleNotifications, changeLang } from "../app/actions";
import { updateSettings } from "../app/actions/settingsActions";

import { Divider, Grid, Paper, Switch, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
  setting: {
    direction: "row",
    justify: "space-between",
    alignItems: "center",
  },
  profilecard: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

class Settings extends React.Component {
  updateSettings = () => {
    const newSettings = {
      notification: true,
      darkMode: !this.props.accountSettings.darkMode,
      language: "English",
      disableAcc: false,
    };
    this.props.updateSettings(newSettings, this.props.user.id);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.header}>Account Settings</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item xs={12} className={classes.profilecard}>
              <ImageUpload />
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid className={classes.setting} container></Grid>
                <Grid className={classes.setting} container>
                  <Grid item>
                    <Typography>Dark Mode</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.props.accountSettings.darkMode}
                      onChange={this.updateSettings}
                      name="darkmode"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </Grid>
                </Grid>
                <Grid item></Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  accountSettings: state.accountSettings,
});

export default connect(mapStateToProps, {
  toggleNotifications,
  changeLang,
  updateSettings,
})(withStyles(styles, { withTheme: true })(Settings));
