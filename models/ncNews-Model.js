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
        return db.query(`SELECT * FROM articles;`)
        .then (({ rows }) => rows);
    }