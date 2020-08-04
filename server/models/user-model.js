const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    usersLiked: [{ type: String, ref: "User", default: [] }],
    authorId: { type: String, ref: "User", required: true },
    authorUsername: { type: String, required: true },
    postId: { type: String, ref: "Post" },
    postOwnerId: { type: String, ref: "User" },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const MediaSchema = new Schema({
  _id: { type: String, required: true }, // Spotify Playlist, Album, or Song id
  name: { type: String, required: true },
  spotifyLink: { type: String, required: true }, // Link to media on Spotify webpage
  artist: { type: String, default: "" }, // Artist name for tracks and albums
  ownerId: { type: String, default: "" }, // the Id of the playlists's owner
  ownerUsername: { type: String, default: "" }, // the username of the playlists's owner
});

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
    type: { type: String, required: true },
    content: { type: String },
    media: { type: MediaSchema, required: true },
    usersLiked: [{ type: String, ref: "User", required: true }],
    repost: { type: Boolean, default: false, required: true },
    authorId: { type: String, ref: "User", required: true },
    username: { type: String, required: true },
    comments: [{ type: CommentSchema, default: [] }],
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    profilePic: { type: String },
    country: { type: String, required: true },
    settings: { type: SettingSchema, default: {} },
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
const Comment = mongoose.model("Comment", CommentSchema);
const Media = mongoose.model("Media", MediaSchema);

module.exports = {
  Post: Post,
  User: User,
  Setting: Setting,
  Comment: Comment,
  Media: Media,
};
