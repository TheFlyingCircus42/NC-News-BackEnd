
/// AMMENDED CONNECTION FILE
// CHANGED FOR REVIST OF BE  APRIL 2026

const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

// Load correct env file FIRST
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

console.log("ENV:", ENV);
console.log("Has DATABASE_URL?", !!process.env.DATABASE_URL);
console.log("Has PGDATABASE?", !!process.env.PGDATABASE);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  config.database = process.env.PGDATABASE;
}

module.exports = new Pool(config);



////////
// version from repo, used to seed SB? 
//  commented out when revisiting end april 2026 

// console.log("ENV:", process.env.NODE_ENV);
// console.log("Has DATABASE_URL?", !!process.env.DATABASE_URL);
// console.log("Has PGDATABASE?", !!process.env.PGDATABASE);

// const { Pool } = require("pg");

// const ENV = process.env.NODE_ENV || 'development'

// require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})



// if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
//   throw new Error("PGDATABASE or DATABASE_URL not set");
// }

// const config = {};

// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.max = 2;
// }
// module.exports = new Pool(config);

/////////////////////////////////
/// ORIGINAL
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
