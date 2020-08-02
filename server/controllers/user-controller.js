const { User, Post, Setting, Comment } = require("../models/user-model");

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

// updateUser updates user if they exist in the db
// else create new user with req.body
updateUser = async (req, res) => {
  console.log("calling updateUser in user-controller");

  console.log(req.body.recentTracks.length);
  console.log(req.body.topTracks.length);
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  console.log("inside user-controller");
  User.findByIdAndUpdate(
    req.body._id,
    req.body,
    {
      upsert: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
      new: true,
      omitUndefined: true,
    },
    (err, User) => {
      if (err) {
        return res.status(400).json({
          err,
          message: "user PUT error",
        });
      }
      console.log(User);
      return res.status(200).json({
        User,
        message: "user PUT success",
      });
    }
  );
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
  User.find({ _id: req.params.id }, "posts following profilePic", function (
    err,
    result
  ) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res.status(404).json({ sucess: false, error: "User not found" });
    }
  })
    .populate({
      path: "following",
      select: "posts profilePic",
    })
    .exec(function (err, result) {
      // console.log(result.data.following.posts);
      // console.log(result.following.posts);
      return res.status(200).json({ success: true, data: result });
    });
  // .catch((err) => console.log(err));
};

// Returns a list of posts created by the user
getUserPosts = async (req, res) => {
  User.findOne({ _id: req.params.id }, "posts profilePic", function (
    err,
    result
  ) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
  }).exec(function (err, user) {
    console.log("user posts");
    console.log(user);
    return res.status(200).json({ success: true, data: user });
  });
  // .catch((err) => console.log(err));
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

editPost = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOneAndUpdate(
    { _id: req.params.id, "posts._id": body.postId },
    { $set: { "posts.$[outer].content": body.content } },
    { arrayFilters: [{ "outer._id": body.postId }], upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid comment update request.",
        });
      }
      return res.status(200).json({ success: true, posts: result.posts });
    }
  );
};

deletePost = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { posts: { _id: body.postId } } },
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

likePost = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOneAndUpdate(
    { _id: req.params.id, "posts._id": body.postId },
    { $addToSet: { "posts.$[outer].usersLiked": body.userId } },
    { arrayFilters: [{ "outer._id": body.postId }], upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid comment update request.",
        });
      }
      return res.status(200).json({ success: true, posts: result.posts });
    }
  );
};

unlikePost = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOneAndUpdate(
    { _id: req.params.id, "posts._id": body.postId },
    { $pull: { "posts.$[outer].usersLiked": body.userId } },
    { arrayFilters: [{ "outer._id": body.postId }], upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid comment update request.",
        });
      }
      return res.status(200).json({ success: true, posts: result.posts });
    }
  );
};
getUserSettings = async (req, res) => {
  User.findOne({ _id: req.params.id }, "settings", (err, User) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log("user contrl method:" + User);
    return res.status(200).json({ success: true, data: User });
  }).catch((err) => console.log(err));
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
  const settings = new Setting(body);
  console.log("settings is " + settings);
  console.log(req.params.id);
  User.findOneAndUpdate(
    { _id: req.params.id },
    { settings: settings },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid settings update request.",
        });
      }
      return res.status(200).json({ success: true, settings: result.settings });
    }
  ).catch((err) => {
    return res.status(404).json({
      error: err,
      message: "User setting not found.",
    });
  });
};

addComment = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  // console.log("Req body is " + body);
  const comment = new Comment(body);
  // console.log("comment is " + comment);
  // console.log("postid", body.postId);
  // console.log(req.params.id);
  User.findOneAndUpdate(
    { _id: req.params.id, "posts._id": body.postId },
    { $push: { "posts.$[outer].comments": comment } },
    { arrayFilters: [{ "outer._id": body.postId }], upsert: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid comment update request.",
        });
      }
      return res.status(200).json({ success: true, posts: result.posts });
    }
  );
};

deleteComment = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOneAndUpdate(
    { _id: req.params.id, "posts._id": body.postId },
    { $pull: { "posts.$[outer].comments": { _id: body.commentId } } },
    { arrayFilters: [{ "outer._id": body.postId }], new: true },
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

getProfilePic = async (req, res) => {
  User.findOne({ _id: req.params.id }, "profilePic", (err, Img) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log("user contrl method img link:" + Img);
    return res.status(200).json({ success: true, data: Img });
  }).catch((err) => console.log(err));
};

updateProfilePic = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log("Req body is " + body);
  console.log(req.params.id);
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      profilePic: body.profilePic,
    },

    { new: true },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "This is an invalid profile pic update request.",
        });
      }
      return res
        .status(200)
        .json({ success: true, profilePic: result.profilePic });
    }
  ).catch((err) => {
    return res.status(404).json({
      error: err,
      message: "User not found.",
    });
  });
};

getFollowers = (req, res) => {
  User.find({ _id: req.params.id }, "followers", (err, followers) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (followers === null) {
      return res.status(404).json({ sucess: false, error: "User not found" });
    }
  })
    .populate({
      path: "followers",
    })
    .exec((err, followers) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: followers });
    });
};

getFollowing = (req, res) => {
  User.find({ _id: req.params.id }, "following", (err, following) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (following === null) {
      return res.status(404).json({ sucess: false, error: "User not found" });
    }
  })
    .populate({
      path: "following",
    })
    .exec((err, following) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: following });
    });
};

updateFollowRelationship = async (req, res) => {
  const followerId = req.params.id;
  const followeeId = req.body.id;
  if (!followeeId) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body/ id to update",
    });
  }

  const followerQuery = { _id: followerId };
  const followeeQuery = { _id: followeeId };

  let followerUpdate = {};
  let followeeUpdate = {};

  if (req.body.remove) {
    followerUpdate = { $pull: { following: followeeId } };
    followeeUpdate = { $pull: { followers: followerId } };
  } else {
    followerUpdate = { $addToSet: { following: followeeId } };
    followeeUpdate = { $addToSet: { followers: followerId } };
  }

  const followerUpdated = await User.updateOne(followerQuery, followerUpdate);
  const followeeUpdated = await User.findOneAndUpdate(
    followeeQuery,
    followeeUpdate,
    { new: true }
  );

  if (!followerUpdated || !followeeUpdated) {
    return res.status(404).json({ error: "Unable to follow that user" });
  }
  return res.status(200).json({ success: true, data: followeeUpdated });
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
  getUserSettings,
  updateProfilePic,
  getProfilePic,
  getFollowers,
  getFollowing,
  updateFollowRelationship,
  // addFollowingFollowerRelationship,
  // removeFollowingFollowerRelationship,
  deletePost,
  addComment,
  deleteComment,
  likePost,
  unlikePost,
  editPost,
};
