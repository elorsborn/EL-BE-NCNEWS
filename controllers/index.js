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
  Article.find()
    .then(articles => {
      res.send({ articles });
    })
    .catch(console.log);
};
