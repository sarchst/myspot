import React from "react";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
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

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    spotifyWebApi.setAccessToken(this.props.spotifyApi.accessToken);
  }

  componentDidMount() {
    spotifyWebApi.getMySavedTracks().then(
      (data) => {
        console.log("Saved Tracks (aka favourites)", data);
        this.setState({
          tracks: data.items,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }
  // this component is just a stand in to display info, will replace with prettier version
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Favourites
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Your liked songs
              </Typography>
            </Container>
          </div>
        </CssBaseline>

        <h1>{this.state.name}</h1>
        <h4>{this.state.description}</h4>
        <ul style={{ listStyleType: "none" }}>
          {this.state.tracks.map((track, index) => (
            <li key={index}>
              <img
                src={track.track.album.images[0].url}
                style={{ width: 50, height: 50 }}
                alt="Album Art"
              />
              {track.track.name + " - " + track.track.artists[0].name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyApi: state.spotifyApi,
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Favourites)
);
