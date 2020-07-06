const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Example from my assignment
// const Message = new Schema(
//   {
//     message: { type: String, required: true },
//     // time: { type: Date, required: true },
//     wordcount: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("messages", Message);

const Setting = new Schema({
  _id: { type: String, required: true },
  notification: { type: Boolean, required: true },
  darkMode: { type: Boolean, required: true },
  language: { type: String, required: true },
  disableAcc: { type: Boolean, required: true },
});

const Post = new Schema(
  {
    _id: { type: String, required: true }, // TODO: confirm that id type is string
    type: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, required: true }, // TODO: may need to be object for spotify?
    usersLiked: { type: Array, required: true },
  },
  { timestamps: true } // TODO: using Array instead of Set because Set is not a valid schema type..shouldn't make a difference though?
);

const User = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    profilePic: { type: String, required: true },
    email: { type: String, required: true },
    settings: { type: Setting, required: true },
    followers: { type: Array, required: true },
    following: { type: Array, required: true },
    posts: { type: [Post], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
