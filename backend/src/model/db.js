const {Pool} = require('pg');
// require('dotenv').config();

const pool = new Pool({
  // ssl: true,
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: process.env.DATABASE_URL
  // host : process.env.PG_HOST,
  // user: process.env.PG_USER, 
  // password : process.env.PG_PW,
  // port : process.env.PG_PORT,
  // database: process.env.PG_DATABASE
});

// pool.on('connect',() => console.log('working'));

module.exports = pool;