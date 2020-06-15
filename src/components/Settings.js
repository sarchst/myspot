import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  setting: {
    direction: "row",
    justify: "space-between",
    alignItems: "center",
  },
});

const languages = ["English", "French"];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: true,
      darkmode: false,
      language: "English",
    };
  }

  toggleNotifications = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  toggleDarkmode = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };
  handleLangSelect = (event) => {
    this.setState({ ...this.state, language: event.target.value });
  };

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
                {/* TODO: will we allow user to upload a new pic which is different from their spotify account pic? */}
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
                <Grid className={classes.setting} container>
                  <Grid item>
                    <Typography>Notifications</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.state.notifications}
                      onChange={this.toggleNotifications}
                      name="notifications"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid className={classes.setting} container>
                  <Grid item>
                    <Typography>Dark Mode</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.state.darkmode}
                      onChange={this.toggleDarkmode}
                      name="darkmode"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="combo-box-lang-label">Language</InputLabel>
                    <Select
                      labelId="combo-box-lang-label"
                      id="combo-box-lang"
                      style={{ width: 200 }}
                      color="primary"
                      onChange={this.handleLangSelect}
                      value={this.state.language}
                    >
                      {languages.map((text, index) => (
                        <MenuItem value={text} key={index}>
                          {text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Divider className={classes.divider} />
                <Typography>Additional Settings Here</Typography>
                <Divider className={classes.divider} />
                <Typography>Additional Settings Here</Typography>
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
