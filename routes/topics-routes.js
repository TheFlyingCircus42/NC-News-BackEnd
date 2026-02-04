/// TOPICS ROUTES 

const express = require("express");
const router = express.Router(); /// <<< can I move to top???


/// # 001 TOPICS --> fetches all topics & rtns an array of objects
const { fetchTopics } = require('../controllers/topics-controller')
router.get('/' , fetchTopics);

module.exports = router;

