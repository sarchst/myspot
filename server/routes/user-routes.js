var express = require("express");
var router = express.Router();

const UserContrl = require("../controllers/user-controller");

router.post("/user", UserContrl.createUser);
router.put("/user/:id", UserContrl.updateUser);
router.get("/user/:id", UserContrl.getUserById);
router.get("/users", UserContrl.getUsers);

router.get("/user/feed/:id", UserContrl.getUserFeed);
router.get("/user/posts/:id", UserContrl.getUserPosts);


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
