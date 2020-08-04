const mongoose = require("mongoose");
const User = require("../models/user-model");

require("dotenv").config();

var dbname = "myspot";
var uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPW}@myspot.gu485.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
