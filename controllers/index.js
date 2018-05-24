const mongoose = require("mongoose");
const { Topic, User, Article, Comment } = require("../models");
const { commentCount, articleCommentCount } = require("../utils");

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
    .populate("created_by", "username")
    .then(articles => {
      if (articles.length === 0) return next({ status: 404 });
      res.send({ articles });
    })
    .catch(next);
};

exports.addArticleToTopic = (req, res, next) => {
  const newArticle = new Article({
    ...req.body,
    belongs_to: req.params.topic,
    created_by: "5b0694259ebb7a16eaf08362" //grumpy19
  });
  return (
    Article.create(newArticle)
      //populate this with username
      .then(article => {
        res.status(201).send({ article });
      })
      .catch(console.log)
  );
};

// =============== ARTICLE CONTROLLERS ===============
exports.getArticles = (req, res, next) => {
  Article.find()
    .lean()
    .populate("created_by", "username")
    .then(articles => {
      return Promise.all([
        articles,
        ...articles.map(articleObj =>
          Comment.count({ belongs_to: articleObj._id })
        )
      ]);
    })
    .then(([articles, ...commentCounts]) => {
      let result = articles.map((articleObj, index) => {
        articleObj.comments = commentCounts[index];
        return articleObj;
      });
      res.send({ articles: result });
    });
};

exports.getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .populate("created_by", "username")
    .then(article => res.send({ article }));
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .populate("created_by", "username")
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.addCommentToArticle = (req, res, next) => {
  const newComment = new Comment({
    ...req.body,
    belongs_to: req.params.article_id,
    created_by: "5b0694259ebb7a16eaf08362" // grumpy19
  });
  return Comment.create(newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(console.log);
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
      res.send({ user });
    })
    .catch(console.log);
  // ************** REFACTOR *************** : no need for an array, will have to change test accordingly
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
    res.send("Comment deleted");
  });
};
