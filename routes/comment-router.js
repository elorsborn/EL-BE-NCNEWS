const router = require("express").Router();
const { voteOnComment, deleteComment } = require("../controllers");

router
  .route("/:comment_id")
  .put(voteOnComment)
  .delete(deleteComment);
module.exports = router;
