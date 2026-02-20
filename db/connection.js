console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL exists?", !!process.env.DATABASE_URL);


const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})



if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
module.exports = new Pool(config);


// const db = new Pool();

// original version of this:
// if (!process.env.PGDATABASE) {
//     throw new Error("No PGDATABASE configured")
// } 
////CAN LOG PASSWORD TO PRODUCTION. 
// else { 
//     console.log(`Connected to ${process.env.PGDATABASE}`)
// }
//module.exports = db;
