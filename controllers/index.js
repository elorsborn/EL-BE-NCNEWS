const mongoose = require("mongoose");

const { Topic, User, Article, Comment } = require("../models");

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(console.log);
};

exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(console.log);
};

exports.getArticlesByTopic = (req, res, next) => {
  const { topic } = req.params;
  Article.find({ belongs_to: topic }).then(articles => {
    res.send({ articles });
  });
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id }).then(comments => {
    res.send({ comments });
  });
};

exports.addArticle = (req, res, next) => {
  const { topic_id } = req.params;
};

exports.getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id).then(article =>
    res.send({ article })
  );
};
