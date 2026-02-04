//// NC NEWS CONTROLLER 
/// SEND TO SERVICES -->

//const { response } = require("../app") //<<-- ???
//const express = require("express"); //<<--?

const { getAllTopics : getAllTopicsService } = require('../services/ncNews-Services');

exports.getAllTopics = (request , response) => 
    {
        getAllTopicsService() // retrieve topics from logic layer ...?
        .then(topics => 
            {
                response.status(200).send({ topics });
            })
    }

// exports.getAllTopics = (request , response) => 
//     {
//         response.status(200).send({ message: 'get all topics - controller'});
//     }

