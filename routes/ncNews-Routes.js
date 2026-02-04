//// N C  N E W S   - ROUTES
/// SEND TO CONTROLLER -->

const express = require("express");

const { getAllTopics } = require("../controllers/ncNews-Controller");

const router = express.Router();

router.get('/' , getAllTopics);


module.exports = router;


// router.get('/' , (request , response) => 
//     {
//         response.send("NC NEWS PLACE HOLDER ") //<<----!!!!!
//     });
