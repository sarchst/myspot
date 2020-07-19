import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DropzoneDialogBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import {
  saveProfilePic,
  fetchProfilePic,
} from "../app/actions/imageUploadActions";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
require("dotenv").config();

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 300,
  },
});

const ImageUpload = ({ saveProfilePic, user, fetchProfilePic }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);

  useEffect(() => {
    console.log("component did mount");
    fetchProfilePic(user.id);
  }, [user.profilePic]);
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={user.profilePic}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.id}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Cool description of me
            </Typography> */}
          </CardContent>
        </CardActionArea>
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
          // TODO: limit upload to 1 image at a time
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          setFileObjects([]);
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          console.log("onSave", fileObjects);
          // handleDrop(fileObjects);
          saveProfilePic(fileObjects, user.id);
          setOpen(false);
          // trigger axios call to put image in cloudinary
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, { saveProfilePic, fetchProfilePic })(
  ImageUpload
);
