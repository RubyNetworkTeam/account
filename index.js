const config = require("./config.json");

const express = require('express');
const subdomain = require('express-subdomain')
const Router = require('./routes/router');

const con = require('./other/mysqlConnection')
const { port } = config;

var xmlparser = require('express-xml-bodyparser');
const logger = require('./other/logger');
const miiRender = require('./routes/mii/mii')

const cookieparser = require('cookie-parser')

const util = require('util')
const query = util.promisify(con.query).bind(con)

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(xmlparser())
app.use(cookieparser())

app.use(express.urlencoded({extended: false}))

//API
app.use("/v1", Router)
app.use("/mii", miiRender)
app.use(express.static('static'))


app.listen(port, async () => {
    await query("set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")
    console.log(logger.Info(`Server started on port ${port}`))
})
