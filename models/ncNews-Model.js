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
    /// (FETCH ALL ARTICLES WITH COMMENT COUNT)
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

    /// FETCH ARTICLE BY ID
exports.fetchArticleByID = (article_id) => 
    {
        // const { article_id } = request.params
        return db.query(`SELECT * FROM articles WHERE article_id = $1` , [article_id])
        .then (({ rows }) => rows)
    }

    /// task 05 FETCH ARTICLE COMMENTS BY ARTICLE ID
exports.fetchArticleComments = (article_id) => 
    {
        return db.query(`SELECT * FROM comments WHERE article_id = $1` , [article_id])
        .then (({rows}) => rows)
    }

    /// task 06 POST COMMENT BY ARTICLE ID
exports.postCommentToArticleID = ({ article_id, username , body }) => 
    {
        return db.query (
            `INSERT INTO comments (article_id, author, body)
            VALUES ($1, $2, $3)
            RETURNING *;` , [article_id , username , body]
        )
        .then(({ rows }) => rows[0]);
    }

exports.patchVotesByArticleID = (article_id , newVotes) => 
    {
        const numOfVotes = newVotes.inc_votes;

        return db.query (
            `UPDATE articles
            SET votes = votes + $2
            WHERE article_id =$1
            RETURNING *;` , [article_id , numOfVotes] )

            .then(({rows})=> rows[0])
    }
    



//// 003 USERS
    /// FETCH ALL USERS
exports.fetchUsers = ()=>
    {
        return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => rows);
    }
    ///


/// 08. CORE: DELETE /api/comments/:comment_id

exports.deleteCommentById = (comment_id)=>
    {
        return db.query(
            `DELETE FROM comments
            WHERE comment_id =$1
            RETURNING *;` , 
            [comment_id]
        )
        .then(({rows})=>rows[0])
    };