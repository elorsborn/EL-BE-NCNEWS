const mongoose = require("mongoose");
const seedDB = require("./seed");
const { DB_URL } = require("../config");

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => seedDB())
  .then(() => {
    console.log("DB successfully seeded...");
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("successfully disconnected");
  })
  .catch(console.log);
