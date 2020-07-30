import React from "react";
import { connect } from "react-redux";
import { DropzoneDialogBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import {
  saveAndUpdateProfilePic,
  fetchProfilePic,
} from "../app/actions/imageUploadActions";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
require("dotenv").config();

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 300,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ImageUpload = ({ saveAndUpdateProfilePic, user, fetchProfilePic }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);


  const handleSnackClose = () => setSnackOpen(false);

  const getProfilePic = () => {
    if (user.profilePic === "") {
      // can set default pic link here
      return "https://res.cloudinary.com/dafyfaoby/image/upload/v1595033507/samples/sheep.jpg";
    } else {
      return user.profilePic;
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={getProfilePic()}
          title="User's profile pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.username}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
              Cool description of me
            </Typography> */}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Edit Profile Picture
          </Button>
          {/* <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button> */}
        </CardActions>
      </Card>

      <DropzoneDialogBase
        acceptedFiles={["image/*"]}
        fileObjects={fileObjects}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          setFileObjects(fileObjects.filter((x) => x !== deleteFileObj));
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          if (fileObjects.length > 1) {
            console.log("only 1 pic allowed");
            setSnackOpen(true);
          } else {
            console.log("onSave", fileObjects);
            saveAndUpdateProfilePic(fileObjects, user.id);
            setOpen(false);
          }
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="error">
          Error: Please select a single image.
        </Alert>
      </Snackbar>
    </div>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, {
  saveAndUpdateProfilePic,
  fetchProfilePic,
})(ImageUpload);
