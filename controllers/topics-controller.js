
/// TOPICS CONTROLLER

/// # 001 - TOPICS
const { fetchTopics } = require('../services/topics-services')
exports.fetchTopics = (request , response) => 
    {
        fetchTopics()
        .then (topics => 
            {
                response.status(200).send({ topics });
            })
    }


