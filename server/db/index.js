const mongoose = require("mongoose");
const User = require("../models/user-model");

// allows you to import environmental variables
require("dotenv").config();

var dbname = "myspot";
var uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPW}@myspot.gu485.mongodb.net/${dbname}?retryWrites=true&w=majority`;
var feedPosts = [];

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("got here line 12");
    User.findOne({ username: "mikayla" })
      .populate({
        path: "following",
        populate: {
          path: "posts",
          populate: {
            path: "usersLiked",
          },
        },
      })
      .exec(function (err, user) {
        if (err) console.log(err);
        followingSize = user.following.length;
        for (i = 0; i < followingSize; i++) {
          // feedPosts.push.apply(user.following[i].posts);
          feedPosts = [...feedPosts, ...user.following[i].posts];
        }
        // console.log(user.following[0].posts);
        console.log(feedPosts);
        // console.log(feedPosts[0].usersLiked);
      });
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
