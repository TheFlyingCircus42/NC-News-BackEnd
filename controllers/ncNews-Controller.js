//// NC NEWS CONTROLLER 
/// SEND TO SERVICES -->



/// # 000 - Hello
const { fetchHello } = require('../services/ncNews-Services')
exports.fetchHello = (request , response) => 
    {
        fetchHello()
        .then( hello => 
            {
                response.status(200).send({hello});
            })
    }
    
    
///// DEAD BELOW /////

        //const { response } = require("../app") //<<-- ???
        //const express = require("express"); //<<--?

/// # 001 - Get All Topics
// const { getAllTopics : getAllTopicsService } = require('../services/ncNews-Services');
// exports.getAllTopics = (request , response) => 
//     {
//         getAllTopicsService() // retrieve topics from logic layer ...?
//         .then(topics => 
//             {
//                 response.status(200).send({ topics });
//             })
//     }





    
// exports.getAllTopics = (request , response) => 
//     {
//         response.status(200).send({ message: 'get all topics - controller'});
//     }

