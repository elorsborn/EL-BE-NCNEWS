const router = require("express").Router();
const {
  getTopics,
  getArticlesByTopic,
  getCommentsByArticle,
  addArticleToTopic
} = require("../controllers");

router.route("/").get(getTopics);

router.route("/:topic/articles").get(getArticlesByTopic);

router.route("./:topic_id/articles").post(addArticleToTopic);
module.exports = router;
