\c nc_news

\echo "ALL COMMENTS WHERE VOTES ARE MORE THAN 10"

SELECT * FROM comments
WHERE votes > 10
ORDER BY votes DESC; 