const mongoose = require("mongoose");
const { Topic, User, Article, Comment } = require("../models");

// =============== TOPIC CONTROLLERS ===============
exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArticlesByTopic = (req, res, next) => {
  const { topic } = req.params;
  Article.find({ belongs_to: topic })
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

exports.addArticleToTopic = (req, res, next) => {
  const { topic_id } = req.params;
  const newArticle = new Article({});
};

// =============== ARTICLE CONTROLLERS ===============
exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id).then(article =>
    res.send({ article })
  );
};
exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.addCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
};

exports.voteOnArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  return Article.findByIdAndUpdate(articleId)
    .then(article => {
      if (req.query.vote === "up") article.votes++;
      else if (req.query.vote === "down") article.votes--;
      return article.save();
    })
    .then(article => res.send({ article }))
    .catch(next);
};

// =============== USER CONTROLLERS ===============
exports.getUser = (req, res, next) => {
  User.find({ username: req.params.username })
    .then(user => {
      res.send(user);
    })
    .catch(console.log);
};
// =============== COMMENT CONTROLLERS ===============

exports.voteOnComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  return Comment.findByIdAndUpdate(commentId)
    .then(comment => {
      if (req.query.vote === "up") comment.votes++;
      else if (req.query.vote === "down") comment.votes--;
      return comment.save();
    })
    .then(comment => res.send({ comment }))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  return Comment.findByIdAndRemove(req.params.comment_id).then(commentId => {
    res.send("deleted successfully");
  });
};
