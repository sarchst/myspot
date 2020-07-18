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

// todo: (Sarchen) reuse Playlist component

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersAlbums: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyWebApi);
  }

  componentDidMount() {
    spotifyWebApi.getMySavedAlbums().then(
      (data) => {
        console.log("User albums", data);
        this.setState({
          usersAlbums: data.items,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }

  render() {
    console.log(this.props.user);
    const { classes, user } = this.props;
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
                Albums
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
              {this.state.usersAlbums.map((playlist, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={playlist.album.images[0].url}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {playlist.album.name}
                      </Typography>
                      <Typography>{playlist.album.artists[0].name}</Typography>
                    </CardContent>
                    <CardActions>
                      {/* todo: (Sarchen) setup link to songlist for album*/}
                      {/* <Link
                        to={
                          "/" +
                          user.username +
                          "/playlists/" +
                          playlist.album.id
                        }
                      > */}
                      {/* <Button size="small" color="primary">
                        View Songs
                      </Button> */}
                      {/* </Link> */}
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
    spotifyWebApi: state.spotifyWebApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Albums)
);
