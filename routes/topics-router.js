const router = require("express").Router();
const { getTopics, getArticlesByTopic } = require("../controllers");

router.route("/").get(getTopics);

router.route("/:topic/articles").get(getArticlesByTopic);
module.exports = router;
