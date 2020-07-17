const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
  {
    notification: { type: Boolean, default: true, required: true },
    darkMode: { type: Boolean, default: false, required: true },
    language: {
      type: String,
      enum: ["English", "French", "Spanish"],
      default: "English",
      required: true,
    },
    disableAcc: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    type: { type: String, required: true }, // TODO: May have to reference this back to media?
    content: { type: String },
    media: { type: String, required: true }, // TODO: may need to be object for spotify?
    usersLiked: [{ type: String, ref: "User", required: true }],
    repost: { type: Boolean, default: false, required: true },
    authorId: { type: String, ref: "User", required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    profilePic: { type: String },
    country: { type: String, required: true },
    settings: { type: Setting, default: {} },
    followers: [{ type: String, ref: "User", default: [] }],
    following: [{ type: String, ref: "User", default: [] }],
    posts: [{ type: PostSchema, default: [] }],
    topTracks: [{ type: Object, default: [] }],
    recentTracks: [{ type: Object, default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Setting = mongoose.model("Setting", SettingSchema);

module.exports = {
  Post: Post,
  User: User,
  Setting: Setting,
};
