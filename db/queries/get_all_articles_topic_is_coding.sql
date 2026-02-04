\c nc_news


\echo "ALL ARTICLES WHERE THE TOPIC IS CODING"
SELECT * FROM articles
WHERE topic ILIKE 'coding';

\echo "ALL ARTICLES"
SELECT * FROM articles;