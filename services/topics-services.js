/// TOPICS SERVICES

/// # 001 TOPICS

const { fetchTopics } = require('../models/topics-model');
exports.fetchTopics = () => 
    {
        return fetchTopics();
    }

