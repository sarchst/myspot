import React from "react";
import { connect } from "react-redux";
import { DropzoneDialogBase } from "material-ui-dropzone";

import {
  saveAndUpdateProfilePic,
  fetchProfilePic,
} from "../app/actions/imageUploadActions";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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
    if (!user.profilePic) {
      return "";
    } else {
      return user.profilePic;
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <Avatar
          className={classes.media}
          src={getProfilePic()}
          style={{ width: "100%", height: "100%", borderRadius: 0 }}
          alt="profile-pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.username}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Edit Profile Picture
          </Button>
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
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          setFileObjects(fileObjects.filter((x) => x !== deleteFileObj));
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          if (fileObjects.length > 1) {
            setSnackOpen(true);
          } else {
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
