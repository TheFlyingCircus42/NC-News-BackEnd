//// NC NEWS SERVICES
/// SEND TO MODEL -->

// require get all topics ???
//const { getAllTopics } = require('../controllers/ncNews-Controller');

const { fetchAllTopics } = require('../models/ncNews-Model');


// this looks pointless because it is... for now
exports.getAllTopics = () => 
    {
        return fetchAllTopics();
    }