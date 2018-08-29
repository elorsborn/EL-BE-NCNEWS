const router = require("express").Router();
const {
  getTopics,
  getArticlesByTopic,
  addArticleToTopic
} = require("../controllers");

router.route("/").get(getTopics);

router
  .route("/:belongs_to/articles")
  .get(getArticlesByTopic)
  .post(addArticleToTopic);
module.exports = router;
