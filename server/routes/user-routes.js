var express = require("express");
var router = express.Router();

const UserContrl = require("../controllers/user-controller");

router.post("/user", UserContrl.createUser);
router.put("/user/:id", UserContrl.updateUser);
router.get("/user/:id", UserContrl.getUserById);
router.get("/users", UserContrl.getUsers);

router.get("/user/feed/:id", UserContrl.getUserFollowingFeed);
router.get("/user/posts/:id", UserContrl.getUserPosts);
router.put("/user/posts/:id", UserContrl.addPost);

router.put("/user/settings/:id", UserContrl.updateSettings);
router.get("/user/settings/:id", UserContrl.getUserSettings);
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
