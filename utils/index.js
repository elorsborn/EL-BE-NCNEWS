exports.formatTopics = topicData => {
  return topicData.map(topic => {
    return {
      title: topic.title,
      slug: topic.slug
    };
  });
};

exports.formatUsers = userData => {
  return userData.map(user => {
    return {
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url
    };
  });
};
// ^^^^^^^^^^^^^^^^^^^^ UNECESSARY BUT DONE NOW SO HEY

exports.formatArticles = (articleData, userDocs) => {
  return articleData.map(article => {
    return {
      ...article,
      belongs_to: article.topic,
      created_by: userDocs.find(user => user.username === article.created_by)
        ._id
    };
  });
};

exports.formatComments = (commentData, articleDocs, userDocs) => {
  return commentData.map(comment => {
    return {
      ...comment,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )._id,
      created_by: userDocs.find(user => user.username === comment.created_by)
        ._id
    };
  });
};
