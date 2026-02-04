//// NC NEWS SERVICES
/// SEND TO MODEL -->


/// # 000 - Hello
const { fetchHello } = require('../models/ncNews-Model');
exports.fetchHello = () => 
    {
        return fetchHello();
    }


///// DEAD BELOW /////

// require get all topics ???
//const { getAllTopics } = require('../controllers/ncNews-Controller');

// / # 001 - Get All Topics
// const { fetchAllTopics } = require('../models/ncNews-Model');
//     // this looks pointless because it is... for now
// exports.getAllTopics = () => 
//     {
//         return fetchAllTopics();
//     }