//// NC NEWS CONTROLLER 
/// SEND TO SERVICES -->


/// # 000 - Hello
const { fetchHello } = require('../services/ncNews-Services')
exports.fetchHello = (request , response) => 
    {
        fetchHello()
        .then( hello => 
            {
                response.status(200)
                .send({hello});
            })
    }

/// # 001 - TOPICS --- AMMEND PATHS

/// 002 ARTILCES
const { fetchArticles } = require('../services/ncNews-Services')
exports.fetchArticles = (request , response) =>
    {
        fetchArticles()
        .then( articles => 
            {
                response.status(200)
                .send({ articles });
            })
    }
/// 003 USERS
const { fetchUsers } = require('../services/ncNews-Services')
exports.fetchUsers = (request , response ) => 
    {
        fetchUsers()
        .then (users => 
            {
                response.status(200)
                .send({ users });
                
            });
    }



 