//// NC NEWS MODEL
/// QUERIES TO DB -->
/// <-- Return down chain

const db = require('../db/connection');

/// # 000 - Hello
exports.fetchHello = ()=>
    {
        return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => rows);
    }



    ///// DEAD BELOW /////

// /// # 001 - Get All Topics
// exports.fetchAllTopics = ()=> 
//     {
//         return db.query(`SELECT * FROM topics;`)
//         .then(({ rows }) => rows);
//     }