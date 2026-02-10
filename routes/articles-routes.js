/// ARTICLES ROUTES 

const express = require("express");
const router = express.Router(); 

/// 002 - Articles
const articlesRouter = express.Router();

// fetchallarticles
const { fetchArticles } = require('../controllers/ncNews-Controller')
articlesRouter.get('/' , fetchArticles);

// fetch article by ID No.
const { fetchArticleByID } = require('../controllers/ncNews-Controller')
articlesRouter.get('/:article_id' , fetchArticleByID)

// task 05 - FETCH COMMENST BY ARTICLE ID
const { fetchArticleComments } = require('../controllers/ncNews-Controller')
articlesRouter.get('/:article_id/comments' , fetchArticleComments)

// task 06 - POST COMMENT
const { postCommentToArticleID } = require('../controllers/ncNews-Controller')
articlesRouter.post('/:article_id/comments' , postCommentToArticleID)


////////////////////////////
module.exports=articlesRouter

