const colors = require('colors');

const config = require("../config.json");
const logger = require('./logger');

const mysql = require('mysql2');

const { mysqlport, mysqlhost, mysqluser, mysqlpassword, mysqldatabase } = config;

var con = mysql.createConnection({
    host: mysqlhost,
    user : mysqluser,
    password : mysqlpassword,
    database : mysqldatabase,
    port: mysqlport ?? undefined,
})

con.connect((err) => {
    if (err) { throw err }
    console.log(logger.MySQL('Connected to Database!'))
})

module.exports = con
