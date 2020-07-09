// spin-off of Material UI login template from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in-side/SignInSide.js

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MusicNoteRoundedIcon from "@material-ui/icons/MusicNoteRounded";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MySpot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/featured/?{music})",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "85vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.default,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    width: "30vw",
  },
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalidLogin: false,
      usernameInput: "",
      passwordInput: "",
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h2">
              <MusicNoteRoundedIcon
                color="secondary"
                style={{ fontSize: 40 }}
              />
              MySpot
              <br />
              <br />
            </Typography>
            <Grid xs={16} className={classes.loginBox}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Button
                className={classes.login}
                type="login"
                href={"http://localhost:8888/login"}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Sign In With Spotify
              </Button>
            </Grid>
            <form className={classes.form} noValidate>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // examples
    // messages: state.messages.messages
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Login)
);
