const {Pool} = require('pg');
// require('dotenv').config();

const pool = new Pool({
  connectionString: DATABASE_URL
  // host : process.PG_HOST,
  // user: process.PG_USER, 
  // password : process.PG_PW,
  // port : process.PG_PORT,
  // database: process.PG_DATABASE
});

pool.on('connect',() => console.log('working'));

module.exports = pool;