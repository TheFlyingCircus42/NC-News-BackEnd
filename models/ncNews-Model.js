//// NC NEWS MODEL
/// QUERIES TO DB -->
/// <-- Return down chain

const db = require('../db/connection');

exports.fetchAllTopics = ()=> 
    {
        return db.query(`SELECT * FROM topics;`)
        .then(({ rows }) => rows);
    }