\c nc_news


\echo "ALL COMMENTS WHERE VOTES ARE BELOW ZERO"
SELECT * FROM comments
WHERE votes < 0
ORDER BY votes DESC;

\echo "ALL COMMENTS"
SELECT * FROM comments
ORDER BY votes DESC;