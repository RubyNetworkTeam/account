const colors = require('colors');

const config = require("../config.json");
const logger = require('./logger');

const mysql = require('mysql2');

const { mysqlport, mysqluser, mysqlpassword, mysqldatabase } = config;

var con = mysql.createConnection({
    host: 'localhost',
    user : mysqluser,
    password : mysqlpassword,
    database : mysqldatabase,
    port: mysqlport,
})

con.connect((err) => {
    if (err) { throw err }
    console.log(logger.MySQL('Connected to Database!'))
})

module.exports = con
