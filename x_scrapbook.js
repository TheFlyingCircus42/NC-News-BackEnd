// TASK 02 - articles comment counter
    // FOR EVERY ARTICLE
    // QUERY DB FOR comments with THIS article ID
    // Count them (rtn from db?)
    // Add this value to the article/rows obj
            // --> article/comment_count = number

const comments = require("./db/data/test-data/comments");

//SQL QUERY
SELECT * FROM comments WHERE article_id = 1;


SELECT SUM (quantity_in_stock)
FROM books;

// SQL count acomments with article ID

SELECT COUNT (article_id) FROM comments WHERE article_id =3;