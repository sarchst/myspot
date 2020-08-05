import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";

const spotifyWebApi = new Spotify();

// will probs use this later but with probs be it's own seperate component!
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         MySpot
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

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
    // identify user with React Router match.params instead because of race conditions with Redux store updating
    let allPlaylists = [];
        let offset = 0;
        let playlists = await spotifyWebApi.getUserPlaylists(
          userID,
          {
            limit: 50,
            offset: offset,
          }
        );
        while (playlists.items.length !== 0) {
          allPlaylists.push(...playlists.items);
          offset += 50;
          playlists = await spotifyWebApi.getUserPlaylists(userID, {
            limit: 50,
            offset: offset,
          });
        }
        this.setState({
          mediaOptions: allPlaylists,
        });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
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
              {/* <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography> */}
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
                      {/* todo: (Sarchen) fix element tags in description */}
                      <Typography>{playlist.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        style={{ textDecoration: "none" }}
                        // TODO: change user to selectedUser._id
                        // to={
                        //   "/" + this.state.userID + "/playlists/" + playlist.id
                        // }
                        to={{
                          pathname: `/${this.state.userID}/playlists/${playlist.id}`,
                          state: {
                            collectionName: playlist.name,
                            collectionDescription: playlist.description,
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
