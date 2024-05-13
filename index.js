const config = require("./config.json");

const express = require('express');
const subdomain = require('express-subdomain')
const Router = require('./routes/router');
const fs = require('fs')
const con = require('./other/postgresqlConnection')
var http = require('http');

var xmlparser = require('express-xml-bodyparser');
const logger = require('./other/logger');
const miiRender = require('./routes/mii/mii')

const cookieparser = require('cookie-parser')

var app = express();

app.use(function (req, res, next) {
    switch (req.method) {
            case "GET":
                console.log(logger.Get(req.originalUrl))
                break;
            case "POST":
                console.log(logger.Post(req.originalUrl))
                break;
            case "PUT":
                console.log(logger.Put(req.originalUrl))
                break;
            case "DELETE":
                console.log(logger.Delete(req.originalUrl))
                break;
            default:
                break;
        }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
	next();
})

app.use(xmlparser())
app.use(cookieparser())

app.use(express.urlencoded({extended: false}))

app.disable('x-powered-by');

//API
app.use("/v1", Router)
app.use("/mii", miiRender)
app.use(express.static('static'))

app.get('/p01/policylist/1/1/:var', (req, res) => {
    const file = fs.readFileSync('routes/api/files/UNK.xml').toString()

    res.set('Content-Type', 'text/xml')
    res.send(file)
})

var httpServer = http.createServer(app);

httpServer.listen(httpPort, async () => {
    console.log(logger.Info(`HTTP Server started on port ${httpPort}`))
})
