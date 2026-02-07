/// ARTICLES ROUTES

const express = require("express");
const usersRouter = express.Router();


/// 003 - USERS
const { fetchUsers } = require('../controllers/ncNews-Controller')
usersRouter.get('/' , fetchUsers);

module.exports=usersRouter