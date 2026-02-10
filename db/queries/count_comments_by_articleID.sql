\c nc_news_test

SELECT 
    a.article_id,
    a.title,
    COUNT(c.comment_id) AS comment_count
FROM articles a
LEFT JOIN comments c
    ON a.article_id = c.article_id
GROUP BY a.article_id, a.title
ORDER BY a.article_id;
