import React from "react";
import { connect } from "react-redux";
import { DropzoneDialogBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { saveProfilePic } from "../app/actions/imageUploadActions";
require("dotenv").config();

const ImageUpload = ({ saveProfilePic, user }) => {
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
          saveProfilePic(fileObjects, user);
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
  return { user: state.user.id };
}
export default connect(mapStateToProps, { saveProfilePic })(ImageUpload);

// reroute this through REACT ACTION.

// export const handleDrop = (files) => {
//   // Push all the axios request promise into a single array
//   const uploaders = files.map((file) => {
//     // Initial FormData
//     console.log(process.env.IMG_CLOUD_UPLOAD_PRESET);
//     console.log(file);
//     const formData = new FormData();
//     formData.append("file", file.data);
//     formData.append("tags", `codeinfuse, medium, gist`);
//     formData.append("upload_preset", process.env.IMG_CLOUD_UPLOAD_PRESET); // Replace the preset name with your own
//     formData.append("api_key", process.env.IMG_CLOUD_API_KEY); // Replace API key with your own Cloudinary key
//     formData.append("timestamp", (Date.now() / 1000) | 0);
//     console.log("got here");
//     console.log(formData);

//     // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
//     return axios
//       .post(
//         process.env.IMG_CLOUD_UPLOAD_URL,
//         formData,
//         {
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//         }
//       )
//       .then((response) => {
//         const data = response.data;
//         const fileURL = data.secure_url; // You should store this URL for future references in your app
//         console.log(data);
//         console.log(fileURL);
//       });
//   });

//   // Once all the files are uploaded
//   axios.all(uploaders).then(() => {
//     // ... perform after upload is successful operation
//     console.log("axios success");
//   });
// };
