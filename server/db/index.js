const mongoose = require("mongoose");

// allows you to import environmental variables
require("dotenv").config();

var dbname = "myspot";
var username;
var uri = `mongodb+srv://myspot:myspot@myspot.gu485.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// MONGOUSER=436pr0ject

mongoose.connect(uri, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
