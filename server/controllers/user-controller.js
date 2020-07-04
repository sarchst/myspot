const User = require("../models/user-model");

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
    // attributes we want the user to be able to update
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

// no deleteUser because we don't want user to be able to remove themselves from db entirely

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, User) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: User });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, Users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!Users.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: Users });
  }).catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
};

// Example from the assignment

// createMessage = (req, res) => {
//   const body = req.body;

//   if (!body) {
//     return res.status(400).json({
//       success: false,
//       error: "You must provide a message for The Abyss",
//     });
//   }

//   const message = new Message(body);

//   if (!message) {
//     return res.status(400).json({ success: false, error: err });
//   }

//   message
//     .save()
//     .then(() => {
//       return res.status(201).json({
//         success: true,
//         id: message._id,
//         message: "Message thrown into the Abyss!",
//       });
//     })
//     .catch((error) => {
//       return res.status(400).json({
//         error,
//         message: "The Abyss rejects your message!",
//       });
//     });
// };

// updateMessage = async (req, res) => {
//   const body = req.body;

//   if (!body) {
//     return res.status(400).json({
//       success: false,
//       error: "You must provide a body to update the Abyss",
//     });
//   }

//   Message.findOne({ _id: req.params.id }, (err, message) => {
//     if (err) {
//       return res.status(404).json({
//         err,
//         message: "The Abyss cannot find your message!",
//       });
//     }
//     message.name = body.message;
//     // message.time = body.time
//     message.rating = body.wordcount;
//     message
//       .save()
//       .then(() => {
//         return res.status(200).json({
//           success: true,
//           id: message._id,
//           message: "The Abyss changed your message!",
//         });
//       })
//       .catch((error) => {
//         return res.status(404).json({
//           error,
//           message: "The Abyss rejects your message update!",
//         });
//       });
//   });
// };

// deleteMessage = async (req, res) => {
//   await Message.findOneAndDelete({ _id: req.params.id }, (err, message) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }

//     if (!message) {
//       return res
//         .status(404)
//         .json({ success: false, error: `The Abyss cannot find your message!` });
//     }

//     return res.status(200).json({ success: true, data: message });
//   }).catch((err) => console.log(err));
// };

// getMessageById = async (req, res) => {
//   await Message.findOne({ _id: req.params.id }, (err, message) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }

//     if (!message) {
//       return res
//         .status(404)
//         .json({ success: false, error: `The Abyss cannot find your message!` });
//     }
//     return res.status(200).json({ success: true, data: message });
//   }).catch((err) => console.log(err));
// };

// getMessages = async (req, res) => {
//   await Message.find({}, (err, messages) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }
//     if (!messages.length) {
//       return res
//         .status(404)
//         .json({
//           success: false,
//           error: `The Abyss cannot find your messages!`,
//         });
//     }
//     return res.status(200).json({ success: true, data: messages });
//   }).catch((err) => console.log(err));
// };

// module.exports = {
//   createMessage,
//   updateMessage,
//   deleteMessage,
//   getMessages,
//   getMessageById,
// };
