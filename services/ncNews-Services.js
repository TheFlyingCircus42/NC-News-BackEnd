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
const { fetchArticles } = require('../models/ncNews-Model');
exports.fetchArticles = () => 
    {
        return fetchArticles();
    }

