const express = require('express');

const subdomain = require('express-subdomain')

const con = require('./other/mysqlConnection')

const colors = require('colors');
const config = require("./config.json");
const mysql = require('mysql')
const { port, dbPassword } = config;
const path = require('path')
const fetch = require('node-fetch')

const eulaRoute = require('./routes/api/v1/eula')
const statusRoute = require('./routes/api/v1/status')
const timezoneRoute = require('./routes/api/v1/timezone')
const rnidRoute = require('./routes/api/v1/rnid')
const emailRoute = require('./routes/api/v1/email')
const peopleRoute = require('./routes/api/v1/people')
const serviceRoute = require('./routes/api/v1/oauth')
const infoRoute = require('./routes/api/v1/info')
const gameRoute = require('./routes/api/v1/game')
const friendRoute = require('./routes/api/v1/friends')
const miiRoute = require('./routes/api/v1/mii')
const tokenRoute = require('./routes/api/v1/service')

const fs = require('fs')

var xmlparser = require('express-xml-bodyparser');


const logger = require('./other/logger')

const cookieparser = require('cookie-parser')

const xmljs= require('xml-js');
const xml = require('xml')

const multer = require('multer')

const https = require('https')

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
app.use('/v1/api/content/agreements/Nintendo-Network-EULA/:var/@latest', eulaRoute)
app.use('/v1/api/devices/@current/status', statusRoute)
app.use('/v1/api/content/time_zones/:var/:var', timezoneRoute)
app.use('/v1/api/people', rnidRoute)
app.use('/v1/api/people/@me/devices/owner', rnidRoute)
app.use('/v1/api/support/validate/email', emailRoute)
app.use('/v1/api/admin/time', emailRoute)
app.use('/v1/api/people/', peopleRoute)
app.use('/v1/api/oauth20/access_token/generate', serviceRoute)
app.use('/v1/api/people/@me/profile', infoRoute)
app.use('/v1/api/people/@me', infoRoute)
app.use('/v1/api/provider/nex_token/@me', gameRoute)
app.use('/v1/api/admin/mapped_ids', friendRoute)
app.use('/v1/api/people/@me/miis/@primary', miiRoute)
app.use('/v1/api/provider/service_token/@me', tokenRoute)
app.use(express.static('static'))


app.listen(port, async () => {
    await query("set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")

    console.log(logger.Info(`Server started on port ${port}`))
})
