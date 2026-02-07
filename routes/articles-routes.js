/// ARTICLES ROUTES 

const express = require("express");
const router = express.Router(); 

/// 002 - Articles
const articlesRouter = express.Router();
const { fetchArticles } = require('../controllers/ncNews-Controller')
articlesRouter.get('/' , fetchArticles);
module.exports=articlesRouter

