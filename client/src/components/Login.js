// spin-off of Material UI login template from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in-side/SignInSide.js

import React from "react";
import { connect } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MusicNoteRoundedIcon from "@material-ui/icons/MusicNoteRounded";
import { withStyles } from "@material-ui/core/styles";

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

let loginURL = "/login";

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
    backgroundColor: "#03DAC6",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    width: "30vw",
    backgroundColor: "#BB86FC",
  },
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Login extends React.Component {
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
                style={{ fontSize: 40, color: "#BB86FC" }}
              />
              MySpot
              <br />
              <br />
            </Typography>
            <Grid className={classes.loginBox}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon style={{ backgroundColor: "#03DAC6" }} />
              </Avatar>
              <Button
                className={classes.login}
                type="login"
                href={loginURL}
                fullWidth
                variant="contained"
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

export default connect()(withStyles(styles, { withTheme: true })(Login));
