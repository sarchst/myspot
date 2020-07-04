var express = require("express");
var router = express.Router();

const UserContrl = require("../controllers/user-controller");

router.post("/user", UserContrl.createUser);
router.put("/user/:id", UserContrl.updateUser);
router.get("/user/:id", UserContrl.getUserById);
router.get("/users", UserContrl.getUsers);

// example from assignment\

// router.post("/message", MovieCtrl.createMessage);
// router.put("/message/:id", MovieCtrl.updateMessage);
// router.delete("/message/:id", MovieCtrl.deleteMessage);
// router.get("/message/:id", MovieCtrl.getMessageById);
// router.get("/messages", MovieCtrl.getMessages);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
