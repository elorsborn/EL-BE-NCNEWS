const router = require("express").Router();
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");

router.get("/", (req, res, next) => {
  res.status(200).send("WELCOME TO NORTHCODERS NEWS");
});

router.use("/topics", topicsRouter);

router.use("/articles", articlesRouter);

module.exports = router;
