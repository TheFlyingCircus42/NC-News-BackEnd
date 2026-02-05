/// ARTICLES ROUTES 

const express = require("express");
const router = express.Router(); 


/// # 002 ARTICLES  --> fetches all rticles -(minus body + comment count)
const { fetchTopics } = require('../controllers/topics-controller')
router.get('/' , fetchTopics);

module.exports = router;

