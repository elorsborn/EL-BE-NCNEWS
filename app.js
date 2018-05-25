const app = require("express")();
const { DB_URL } = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api-router");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to the database...${DB_URL}`);
});

app.use(bodyParser.json());
app.use("/api", apiRouter);

app.get("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: "Page Not Found" });
  else if (err.status === 400) res.status(400).send({ msg: "Bad request" });
  else res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
