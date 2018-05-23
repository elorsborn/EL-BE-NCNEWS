const router = require("express").Router();
const {
  getArticles,
  getCommentsByArticle,
  getArticleById
} = require("../controllers");

router.route("/").get(getArticles);

router.route("/:article_id/comments").get(getCommentsByArticle);

router.route("/:article_id").get(getArticleById);
module.exports = router;
