const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const data = process.env.NODE_ENV === "test" ? "testData" : "devData";
const articleData = require(`./${data}/articles.json`);
const commentData = require(`./${data}/comments.json`);
const topicData = require(`./${data}/topics.json`);
const userData = require(`./${data}/users.json`);
const {} = require("../utils");

exports.seedDB = () => {};
