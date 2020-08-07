import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";

import {
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

import Button from "@material-ui/core/Button";

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

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersAlbums: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount() {
    this.getAllAlbums()
      .then((allAlbums) => {
        this.setState({
          usersAlbums: allAlbums,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getAllAlbums = async () => {
    let allAlbums = [];
    let offset = 0;
    let albums = await spotifyWebApi.getMySavedAlbums({
      limit: 50,
      offset: offset,
    });
    while (albums.items.length !== 0) {
      allAlbums.push(...albums.items);
      offset += 50;
      albums = await spotifyWebApi.getMySavedAlbums({
        limit: 50,
        offset: offset,
      });
    }
    return allAlbums;
  };

  render() {
    const { classes, selectedUser } = this.props;
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
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.usersAlbums.map((album, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={album.album.images[0].url}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {album.album.name}
                      </Typography>
                      <Typography>{album.album.artists[0].name}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={{
                          pathname: `/${selectedUser._id}/albums/${album.album.id}`,
                          state: {
                            collectionName: album.album.name,
                            collectionDescription: album.album.description,
                          },
                        }}
                      >
                        <Button size="small" color="secondary">
                          View Songs
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        color="secondary"
                        href={album.album.external_urls.spotify}
                        target="_blank"
                      >
                        View on Spotify
                      </Button>
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
    selectedUser: state.selectedUser,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Albums)
);
