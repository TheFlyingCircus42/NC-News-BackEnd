//// NC NEWS MODEL
/// QUERIES TO DB -->
/// <-- Return down chain

const db = require('../db/connection');


/// # 000 - Hello
exports.fetchHello = ()=>
    {
        return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => rows);
    }

/// 001 TOPICS

/// 002 ARTICLES
exports.fetchArticles = () => 
    {
        return db.query(`SELECT 
            articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.comment_id)::INT AS comment_count
            FROM articles
            LEFT JOIN comments
            ON comments.article_id = articles.article_id
            GROUP BY
            articles.article_id,
            articles.author,
            articles.title,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url
            ORDER BY created_at ASC;`)
        .then (({ rows }) => rows);
        
    }