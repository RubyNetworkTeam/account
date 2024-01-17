// Imports :D dont touch it
import config from "./config.json";
import express from 'express';
import {ApiRouter} from './routes/router';
import fs from 'fs';
import http from 'http';
import https from 'https';
import './other/postgresqlConnection';
import xmlparser from 'express-xml-bodyparser';

// i won't remove that now
//import subdomain from 'express-subdomain';

const privateKey  = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const { httpPort, httpsPort } = config;

import {Info, Middleware} from  './other/logger';
import {MiiRouter} from  './routes/mii/mii';
import cookieparser from  'cookie-parser';
import { XMLMiddelware } from "./other/jsxml";

const app = express();

app.use(XMLMiddelware);
app.use(Middleware);

app.use(xmlparser())
app.use(cookieparser())

app.use(express.urlencoded({extended: false}))

app.disable('x-powered-by');

//API
app.use("/v1", ApiRouter)
app.use("/mii", MiiRouter)
app.use(express.static('static'))

app.get('/p01/policylist/1/1/:var', (req, res) => {
    const file = fs.readFileSync('routes/api/files/UNK.xml').toString()

    res.set('Content-Type', 'text/xml')
    res.send(file)
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, async () => {
    console.log(Info(`HTTP Server started on port ${httpPort}`))
})
httpsServer.listen(httpsPort, async () => {
    console.log(Info(`HTTPS Server started on port ${httpsPort}`))
})
