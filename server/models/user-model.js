const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Setting = new Schema({
  notification: { type: Boolean, default: true, required: true },
  darkMode: { type: Boolean, default: false, required: true },
  language: {
    type: String,
    enum: ["English", "French", "Spanish"],
    default: "English",
    required: true,
  },
  disableAcc: { type: Boolean, default: false, required: true },
});

const Post = new Schema(
  {
    type: { type: String, required: true }, // TODO: May have to reference this back to media?
    content: String,
    media: { type: String, required: true }, // TODO: may need to be object for spotify?
    usersLiked: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const User = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, default: this._id },
    profilePic: String, // TODO this will be coming from Spotify but they may not have one
    email: { type: String, required: true },
    settings: { type: Setting, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    posts: { type: [Post], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
