const router = require("express").Router();
const { getArticles, getCommentsForArticle } = require("../controllers");

router.route("/").get(getArticles);

// router.route("/:article_id/comments").get(getCommentsForArticle);
module.exports = router;
