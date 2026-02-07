//// N C  N E W S   - ROUTES
/// SEND TO CONTROLLER -->

const express = require("express");
//

/// # 000 - Hello
const router = express.Router(); 
const { fetchHello } = require('../controllers/ncNews-Controller')
router.get('/' , fetchHello);
module.exports=router
/// 001 TOPICS

// /// 002 - Articles
// const articlesRouter = express.Router();
// const { fetchArticles } = require('../controllers/ncNews-Controller')
// articlesRouter.get('/' , fetchArticles);
// module.exports=articlesRouter

// /// 003 - USERS
// const usersRouter = express.Router();
// const { fetchUsers } = require('../controllers/ncNews-Controller')
// usersRouter.get('/' , fetchUsers);
// module.exports=usersRouter



