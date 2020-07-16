const { User, Post, Setting } = require("../models/user-model");

createUser = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User(body);
  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, User) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    // confirm that these attributes we want the user to be able to update
    User.profilePic = body.profilePic;
    User.email = body.email;
    User.settings = body.settings;
    User.followers = body.followers;
    User.following = body.following;
    User.posts = body.posts;
    User.save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: User._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

// No deleteUser because we don't want user to be able to remove themselves from our db entirely

// don't think we need to await keyword because we're using callbacks
// Returns a single user from the database
getUserById = async (req, res) => {
  User.findOne({ _id: req.params.id }, (err, User) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: User });
  }).catch((err) => console.log(err));
};

// Returns a list of all users in the database
getUsers = async (req, res) => {
  User.find({}, (err, Users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!Users.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: Users });
  }).catch((err) => console.log(err));
};

// Returns a list of posts created by users the current user follows
getUserFollowingFeed = async (req, res) => {
  User.find({ _id: req.params.id }, "posts following", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res.status(404).json({ sucess: false, error: "User not found" });
    }
  })
    .populate({
      path: "following",
      select: "posts",
    })
    .exec(function (err, result) {
      // console.log(result.data.following.posts);
      // console.log(result.following.posts);
      return res.status(200).json({ success: true, data: result });
    })
    .catch((err) => console.log(err));
};

// Returns a list of posts created by the user
getUserPosts = async (req, res) => {
  User.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
  })
    .exec(function (err, user) {
      console.log(user.posts);
      return res.status(200).json({ success: true, data: user.posts });
    })
    .catch((err) => console.log(err));
};

addPost = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "This is an invalid post.",
    });
  }

  const post = new Post(body);

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { posts: post } },
    { new: true, upsert: true },
    (err, user) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid update request.",
        });
      }
      return res.status(200).json({ success: true, posts: user.posts });
    }
  );
};

updateSettings = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log("Req body is " + body);
  const setting = new Setting(body);
  console.log("settings is " + setting);
  console.log(req.params.id);
  User.findOneAndUpdate(
    { _id: req.params.id },
    { settings: setting },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid settings update request.",
        });
      }
      return res.status(200).json({ success: true, settings: result });
    }
  ).catch((err) => {
    return res.status(404).json({
      error: err,
      message: "User setting not found.",
    });
  });
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  getUserFollowingFeed,
  getUserPosts,
  addPost,
  updateSettings,
};
