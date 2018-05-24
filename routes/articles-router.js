const router = require("express").Router();
const {
  getArticles,
  getCommentsByArticle,
  getArticleById,
  voteOnArticle,
  addCommentToArticle
} = require("../controllers");

router.route("/").get(getArticles);
router
  .route("/:article_id")
  .get(getArticleById)
  .put(voteOnArticle);
router
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(addCommentToArticle);

module.exports = router;
