const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const data = process.env.NODE_ENV === "test" ? "testData" : "devData";
const {
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments
} = require("../utils");
const articleData = require(`./${data}/articles.json`);
const commentData = require(`./${data}/comments.json`);
const topicData = require(`./${data}/topics.json`);
const userData = require(`./${data}/users.json`);

//REFACTOR THE ABOVE

exports.seedDB = () => {
  return Promise.all([
    Topic.insertMany(formatTopics(topicData)),
    User.insertMany(formatUsers(userData))
  ])
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticles(articleData, userDocs)),
        userDocs
      ]);
    })
    .then(([articleDocs, userDocs]) => {
      return Comment.insertMany(
        formatComments(commentData, articleDocs, userDocs)
      );
    })
    .then(commentDocs => commentDocs)
    .catch(console.log);
};
