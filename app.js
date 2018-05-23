process.env.NODE_ENV = !process.env.NODE_ENV ? "dev" : "test";
const app = require("express")();
const { DB_URL } = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to the database...${DB_URL}`);
});

module.exports = app;
