const db = require("../connection");
const format = require("pg-format");
const { createLookUpObject } = require("./seed-utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics");
    })
    .then(() => {
      return db.query(`CREATE TABLE topics(
              slug VARCHAR PRIMARY KEY,
              description VARCHAR,
              img_url VARCHAR(1000) )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
                username VARCHAR PRIMARY KEY,
                name VARCHAR,
                avatar_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
                  article_id  SERIAL PRIMARY KEY,
                  title VARCHAR,
                  topic VARCHAR references topics(slug),
                  author VARCHAR REFERENCES users(username),
                  body TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                  votes INTEGER DEFAULT 0,
                  article_img_url VARCHAR(1000) )`);
    })

    .then(() => {
      return db.query(`CREATE TABLE comments(
                    comment_id SERIAL PRIMARY KEY,
                    article_id INTEGER NOT NULL REFERENCES articles(article_id),
                    body TEXT,
                    votes INTEGER DEFAULT 0,
                    author VARCHAR REFERENCES users(username),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )`);
    })

    .then(() => {
      const formattedTopicsData = topicData.map(
        ({ slug, description, img_url }) => [slug, description, img_url],
      );
      const insertTopicsQuery = format(
        "INSERT INTO topics (slug, description, img_url) VALUES %L;",
        formattedTopicsData,
      );
      return db.query(insertTopicsQuery);
    })

    .then(() => {
      const formattedUserData = userData.map(
        ({ username, name, avatar_url }) => [username, name, avatar_url],
      );
      const insertUsersQuery = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L;`,
        formattedUserData,
      );
      return db.query(insertUsersQuery);
    })

    .then(() => {
      const formattedArticlesData = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });

      const insertArticlesQuery = format(
        `INSERT INTO articles (title , topic , author , body , created_at , votes , article_img_url) VALUES %L RETURNING *`,
        formattedArticlesData,
      );
      return db.query(insertArticlesQuery);
    })

    .then(({ rows }) => {
      const articlesFromDB = rows;

      const articlesLookUpObject = createLookUpObject(
        articlesFromDB,
        "title",
        "article_id",
      );

      const formattedCommentData = commentData.map((comment) => {
        const article_id = articlesLookUpObject[comment.article_title];

        return [
          article_id,
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });

      const insertCommentsQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at)
     VALUES %L;`,
        formattedCommentData,
      );

      return db.query(insertCommentsQuery);
    });
  
};

module.exports = seed;

