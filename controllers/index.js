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
  const { belongs_to } = req.params;
  Article.find({ belongs_to })
    .lean()
    .populate("created_by", "username")
    .then(articles => {
      if (articles.length === 0) return next({ status: 404 });
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
    })
    .catch(next);
};
// const { belongs_to } = req.params;
// const { body, created_by } = req.body;
// Comment.create({ body, belongs_to, created_by })
//   .then(comment => {
//     res.status(201).send({ comment });
//   })
//   .catch(err => {
//     console.log(err);
//   });
exports.addArticleToTopic = (req, res, next) => {
  const { title, body, created_by } = req.body;
  const { belongs_to } = req.params;
  if (body === undefined) return next({ status: 400 });
  Article.create({
    title,
    created_by,
    body,
    belongs_to
  })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => {
      if (err.name === "ValidationError") return next({ status: 400 });
      next(err);
    });
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
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .populate("created_by", "username")
    .then(article => res.send({ article }))
    .catch(err => {
      if (err.name === "CastError") return next({ status: 404 });
      next(err);
    });
};

exports.getCommentsByArticle = (req, res, next) => {
  const { belongs_to } = req.params;
  Comment.find({ belongs_to })
    .populate("created_by", "username")
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      if (err.name === "CastError") return next({ status: 404 });
      next(err);
    });
};

exports.addCommentToArticle = (req, res, next) => {
  const { belongs_to } = req.params;
  const { body, created_by } = req.body;
  Comment.create({ body, belongs_to, created_by })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      if (err.name === "ValidationError") return next({ status: 400 });
      next(err);
    });
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
  return User.findOne({ username: req.params.username })
    .then(user => {
      if (user === null) return next({ status: 404 });
      res.send({ user });
    })
    .catch(next);
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
  return Comment.findByIdAndRemove(req.params.comment_id)
    .then(commentId => {
      res.send({ msg: "Comment deleted" });
    })
    .catch(next);
};
