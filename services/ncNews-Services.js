//// NC NEWS SERVICES
/// SEND TO MODEL -->


/// # 000 - Hello
const { fetchHello } = require('../models/ncNews-Model');
exports.fetchHello = () => 
    {
        return fetchHello();
    }

/// 001 Topics

/// 002 ARTICLES
    /// FETCH ALL ARTICLES
const { fetchArticles } = require('../models/ncNews-Model');
exports.fetchArticles = () => 
    {
        return fetchArticles();
    }
    /// FETCH ARTICLE BY ID
const { fetchArticleByID } = require('../models/ncNews-Model')
exports.fetchArticleByID = (article_id) => 
    {
        return fetchArticleByID(article_id);
    }

    /// task 05 FETCH COMMENTS BY ARTICLE ID
const { fetchArticleComments } = require('../models/ncNews-Model')
exports.fetchArticleComments = (article_id) => 
    {
        return fetchArticleComments(article_id);
    }

    /// task 06 Post Comment to article ID
const { postCommentToArticleID } = require('../models/ncNews-Model')
exports.postCommentToArticleID = (article_id , newComment) => 
    {
        return postCommentToArticleID({ article_id , ...newComment});
    }

    /// task 07 - patch votes by article id
const { patchVotesByArticleID } = require("../models/ncNews-Model")
exports.patchVotesByArticleID = (article_id , newVotes) =>
{
    return patchVotesByArticleID(article_id , newVotes)
}

/// 003 USERS
const { fetchUsers } = require('../models/ncNews-Model')
exports.fetchUsers = () => 
    {
        return fetchUsers();
    }
