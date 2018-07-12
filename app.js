const app = require("express")();
const { DB_URL } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api-router");
const cors = require("cors");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to the database...${DB_URL}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.render("index.html");
});

app.get("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: "Page Not Found" });
  else if (err.status === 400) res.status(400).send({ msg: "Bad request" });
  else res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
