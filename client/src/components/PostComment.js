import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class PostComment extends React.Component {
  render() {
    const { commentdata } = this.props;
    return (
      <Grid
        item
        container
        direction="row"
        spacing={1}
        // className="commentContainer"
      >
        <Grid item>
          <Typography
            color="primary"
            // className="commentItem"
          >
            {commentdata.time}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="secondary"
            // fontWeight="bold"
            // className="commentItem"
          >
            {commentdata.authorId}:
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            // className="commentItem"
            fontFamily="Monospace"
          >
            {commentdata.content}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PostComment);
