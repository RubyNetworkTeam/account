const config = require("./config.json");

const express = require('express');
const subdomain = require('express-subdomain')
const Router = require('./routes/router');

const con = require('./other/mysqlConnection')
const { port, dbPassword } = config;


// Removed unuseful requires
// const colors = require('colors');
// const path = require('path')
// const fetch = require('node-fetch')
// const fs = require('fs')
// const xmljs= require('xml-js');
// const xml = require('xml')
// const multer = require('multer')
// const https = require('https')

var xmlparser = require('express-xml-bodyparser');
const logger = require('./other/logger');

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
app.use(express.static('static'))


app.listen(port, async () => {
    await query("set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")
    console.log(logger.Info(`Server started on port ${port}`))
})
