var mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nurdb'
})

module.exports = connection;