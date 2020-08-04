import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const spotifyWebApi = new Spotify();

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
  },
});

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersPlaylists: [],
      userID: "",
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount() {
    const userID = this.props.match.params.user;
    spotifyWebApi.getUserPlaylists(userID).then(
      (data) => {
        this.setState({
          usersPlaylists: data.items,
          userID: userID,
        });
      },
      function (err) {
        console.error("Failed to fetch playlists for match params user", err);
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {this.props.match.params.user === this.props.user.id
                  ? "My"
                  : `${this.props.selectedUser.username}'s`}{" "}
                Playlists
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.usersPlaylists.map((playlist, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        playlist.images.length > 0
                          ? playlist.images[0].url
                          : null
                      }
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {playlist.name}
                      </Typography>
                      <Typography>{playlist.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={{
                          pathname: `/${this.state.userID}/playlists/${playlist.id}`,
                          state: {
                            playlistName: playlist.name,
                            playlistDescription: playlist.description,
                          },
                        }}
                      >
                        <Button size="small" color="secondary">
                          View Songs
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyApi: state.spotifyApi,
    user: state.user,
    selectedUser: state.selectedUser,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Playlists)
);
