const router = require("express").Router();
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
const usersRouter = require("./user-router");
const commentsRouter = require("./comment-router");

router.get("/", (req, res, next) => {
  res.status(200).send("WELCOME TO NORTHCODERS NEWS");
});

router.use("/topics", topicsRouter);

router.use("/articles", articlesRouter);

router.use("/users", usersRouter);

router.use("/comments", commentsRouter);

module.exports = router;
