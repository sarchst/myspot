// spin-off of Material UI login template from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in-side/SignInSide.js

import React from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import {logIn} from "../app/actions";
import red from "@material-ui/core/colors/red";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                MySpot
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/featured/?{music})',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidLogin: false,
            usernameInput: "",
            passwordInput: ""
        };
    }

    usernameInput = (event) => {
        this.setState({
            usernameInput: event.target.value
        })
    }

    passwordInput = (event) => {
        this.setState({
            passwordInput: event.target.value
        })
    }



    attemptLogin = () => {
        if (this.checkUsernameAndPassword()) {
            this.logIn();
        } else {
            this.setState(state => ({
                isInvalidLogin: true
            }));
        }
    }

    logIn = () => {
        this.setState(state => ({
            isInvalidLogin: false
        }));
        this.props.logIn();
    }

    checkUsernameAndPassword = () => {
        return (this.state.usernameInput !== "" && this.state.passwordInput !== "");
    }

    displayLoginError = () => {
        if (this.state.isInvalidLogin) {
            return (
                <Typography style={{ color: red[500] }} align="center">
                    Please enter a username and password.
                </Typography>
            )
        } else {
            return null;
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h2">
                            <MusicNoteRoundedIcon color="secondary" style={{ fontSize: 40 }}/>
                            MySpot
                            <br/>
                            <br/>
                        </Typography>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.usernameInput}
                                onChange={this.usernameInput}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.passwordInput}
                                onChange={this.passwordInput}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {this.displayLoginError()}
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.attemptLogin}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
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

const mapStateToProps = state => {
    return {
        // examples
        // messages: state.messages.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => dispatch(logIn())
        // examples
        // selectMessage: selectedMessage => dispatch(selectMessage(selectedMessage)),
        //     deleteMessage: idx => dispatch(deleteMessage(idx))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Login));