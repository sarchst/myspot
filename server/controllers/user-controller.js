const User = require("../models/user-model");

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
