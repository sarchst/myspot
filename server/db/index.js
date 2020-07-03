const mongoose = require("mongoose");

const uri = ""; // this will need to be the uri for our database

mongoose.connect(uri, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
