process.env.NODE_ENV = "dev";
const { seedDB } = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const { formatTopics } = require("../utils");

mongoose
  .connect(DB_URL)
  .then(() => {
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log("dropped DB");
    return seedDB();
  })
  .then(() => {
    console.log("DB successfully seeded...");
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("successfully disconnected");
  })
  .catch(console.log);
