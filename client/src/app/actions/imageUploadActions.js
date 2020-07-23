import axios from "axios";
export const FETCH_PROFILEPIC_SUCCESS = "FETCH_PROFILE_PIC_SUCESS";

export const saveAndUpdateProfilePic = (files, id) => {
  return (dispatch) => {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      // console.log(file);
      // https://cloudinary.com/documentation/how_to_integrate_cloudinary
      // according to the docs, api_key, cloud name can be public

      const formData = new FormData();
      formData.append("file", file.data);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "i0r4rfo8"); // Replace the preset name with your own
      formData.append("api_key", "548279656671333"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      // console.log("got here");
      // console.log(formData);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dafyfaoby/image/upload",
          formData
          // {
          //   headers: {
          //     "X-Requested-With": "XMLHttpRequest",
          //   },
          // }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          // console.log(data);
          // console.log("file url is " + fileURL);
          return fileURL;
        })
        .then((url) => {
          // console.log("url is " + url);

          return axios
            .put(`http://localhost:9000/user/profilepic/${id}`, {
              profilePic: url,
            })
            .then((res) => {
              // console.log("Res: ", res);
              // console.log("put success");
              // dispatch(makePostSuccess(res.data.posts));
            })
            .catch((error) => {
              throw error;
            });
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log("profile pic successfully changed");
      dispatch(fetchProfilePic(id));
    });
  };
};

export const fetchProfilePicSuccess = (url) => {
  return {
    type: FETCH_PROFILEPIC_SUCCESS,
    payload: url,
  };
};

export const fetchProfilePic = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:9000/user/profilepic/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        // console.log("Res " + JSON.stringify(res));
        dispatch(fetchProfilePicSuccess(res.data.profilePic));
      })
      .catch((err) => {
        console.log("fetch profile pic err: " + err);
        throw err;
      });
  };
};

export async function fetchProfilePicById(id) {
  // return (dispatch) => {
  fetch(`http://localhost:9000/user/profilepic/${id}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      // console.log("Res in fetchProfilePicById " + JSON.stringify(res));
      // console.log(res.data.profilePic);
      // dispatch(fetchProfilePicSuccess(res.data.profilePic));
      return res.data.profilePic;
    })
    .catch((err) => {
      console.log("fetch profile pic err: " + err);
      throw err;
    });
}
