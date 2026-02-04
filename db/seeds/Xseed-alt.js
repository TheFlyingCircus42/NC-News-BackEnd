const db = require("../connection");
const format = require("pg-format");
const { createLookUpObject } = require("./seed-utils");
const { commentReactionsData } = require("../data/test-data");

const seed = ({ topicData, userData, articleData, commentData, reactionData, commentReactionsData }) => {

    //////////// D R O P  T A B L E S /////////////////////
    return db.query("DROP TABLE IF EXISTS commentReactions")
    .then(()=>{
      return db.query("DROP TABLE IF EXISTS reactions");
    })
    .then(()=>{
      return db.query("DROP TABLE IF EXISTS comments");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics");
    })
    
    //////////// C R E A T E   T A B L E S /////////////////////
    
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
    .then(()=>{
      return db.query(`CREATE TABLE reactions(
                        reaction_id SERIAL PRIMARY KEY,
                        reaction VARCHAR)`)
    })
     .then(()=>{
      return db.query(`CREATE TABLE commentReactions(
                        commentReaction_id SERIAL PRIMARY KEY,
                        comment_id INTEGER REFERENCES comments(comment_id),
                        reaction_id INTEGER REFERENCES reactions(reaction_id),
                        username VARCHAR REFERENCES users(username),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )`)      
    })

    //////////// I N S E R T   I N T O   T A B L E S /////////////////////
    

    //// - INSERT TOPICS
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

    /// INSERT USERS
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
    ////INSERT ARTICLES
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
     VALUES %L returning *`,
        formattedCommentData,
      );

      return db.query(insertCommentsQuery);
    })
    .then(({rows}) => {
      const commentsFromDB = rows;

      const commentLookUpObject = createLookUpObject(
        commentsFromDB,
        "body",
        "comment_id"
      );

        const formattedReactionsData = reactionData.map(
        ({reaction}) => [reaction]
      );
      const insertReactionsQuery = format(
        `INSERT INTO reactions (reaction) VALUES %L RETURNING *;`,
        formattedReactionsData,
      );
      return db.query(insertReactionsQuery);
    })
      .then(({rows}) => {
      const reactionsFromDB = rows;
      const reactionsLookUpObject = createLookUpObject (
        reactionsFromDB , "reaction" , "reaction_id");

      const formattedCommentReactions = commentReactionsData.map(({comment_body, reaction_name, username})=> [
        commentLookUpObject[comment_body],
        reactionsLookUpObject[reaction_name],
        username,
      ]);

      const insertCommentReactionsQuery = format(
        `INSERT INTO commentReactions (
        comment_id, reaction_id, username) VALUE %L;`,
        formattedCommentReactions
      );

      return db.query(insertCommentReactionsQuery);
      });
      
   
  


    
};

// module.exports = seed;

//  comments(comment_id),
//                         user VARCHAR REFERENCES users(username),
//                         reaction VARCHAR REFERENCES reactions(reactions