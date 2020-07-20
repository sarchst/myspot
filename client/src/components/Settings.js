import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
// import Button from "@material-ui/core/Button";
import ImageUpload from "./ImageUpload";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  toggleNotifications,
  // toggleDarkmode,
  changeLang,
} from "../app/actions";
import {
  // toggleDarkmode,
  updateSettings,
} from "../app/actions/settingsActions";
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
});

// const languages = ["English", "French", "Spanish"];

class Settings extends React.Component {
  // state = {
  //   // user: this.props.user.id,
  //   notification: true, // user id, ref to user schema
  //   darkMode: this.props.accountSettings.darkmode,
  //   language: "English",
  //   disableAcc: false,
  // };

  // handleNotifToggle = () => {
  //   this.props.toggleNotifications(this.props.accountSettings.notifications);
  // };

  // handleDarkmodeToggle = () => {
  //   // this.props.toggleDarkmode(this.props.accountSettings.darkmode);
  //   console.log(this.state);
  //   this.props.toggleDarkmode(this.state, this.props.user);
  // };
  // handleLangSelect = (event) => {
  //   this.props.changeLang(event.target.value);
  // };

  updateSettings = () => {
    console.log("Settings (darkmode) being updated!");
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
            {/* <Paper className={classes.paper}>
              <Grid className={classes.userdata} container>
                <AccountCircleIcon className={classes.profilePic} />
                <Grid className={classes.content} item>
                  <Grid item>
                    <Typography>Username: {user.username}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Email: associatedEmail@gmail.com</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper> */}
            <ImageUpload />
            {/* <Divider className={classes.divider} /> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid className={classes.setting} container>
                  {/* Notifications toggle commented out for now, until we implement it */}
                  {/* <Grid item>
                    <Typography>Notifications</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.props.accountSettings.notifications}
                      onChange={this.handleNotifToggle}
                      name="notifications"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </Grid> */}
                </Grid>
                {/* <Divider className={classes.divider} /> */}
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
                {/* <Divider className={classes.divider} /> */}
                <Grid item>
                  {/* Language drop down commented out for now, until we implement it */}
                  {/* <FormControl className={classes.formControl}>
                    <InputLabel id="combo-box-lang-label">Language</InputLabel>
                    <Select
                      labelId="combo-box-lang-label"
                      id="combo-box-lang"
                      style={{ width: 200 }}
                      color="primary"
                      onChange={this.handleLangSelect}
                      value={this.props.accountSettings.language}
                    >
                      {languages.map((text, index) => (
                        <MenuItem value={text} key={index}>
                          {text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
              </Paper>
            </Grid>
            {/* <Divider className={classes.divider} /> */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Button variant="outlined" color="primary">
                  Disable My MySpot Account
                </Button>
              </Paper>
            </Grid> */}
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
  // toggleDarkmode,
  changeLang,
  updateSettings,
})(withStyles(styles, { withTheme: true })(Settings));
