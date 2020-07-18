import React from "react";
import Dropzone from "react-dropzone";
import { DropzoneDialogBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

// class ImageUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fileObjects: [],
//       setFileObjects: [],
//       open: false,
//       setOpen: false,
//     };
//   }
export default function ImageUpload() {
  const [open, setOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Image
      </Button>

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
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          console.log("onSave", fileObjects);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
}
