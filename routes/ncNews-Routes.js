//// N C  N E W S   - ROUTES
/// SEND TO CONTROLLER -->

const express = require("express");
const router = express.Router(); /// <<< can I move to top???


/// # 000 - Hello
const { fetchHello } = require('../controllers/ncNews-Controller')
router.get('/' , fetchHello);


module.exports = router;

///// DEAD BELOW /////

// /// # 001 TOPICS
// const { fetchTopics } = require('../controllers/topics-controller')
// router.get('/' , fetchTopics);
/// # 001 - Get All Topics
//const { getAllTopics } = require("../controllers/ncNews-Controller");
// const router = express.Router(); /// <<< can I move to top???
//router.get('/' , getAllTopics);

/// # 002 - Get All Articles
// router.get('/' , getAllArticles)


// router.get('/' , (request , response) => 
//     {
//         response.send("NC NEWS PLACE HOLDER ") //<<----!!!!!
//     });
