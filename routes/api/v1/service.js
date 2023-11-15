const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', (req, res) => {
    const client_id = req.header("X-Nintendo-Client-ID")
    console.log(logger.Get("/v1/api/provider/service_token/@me"))
    const id = query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    id.then(function(result) {
    const token = query(`SELECT serviceToken FROM accounts WHERE nnid="${result[0].rnid}"`);
    res.set('Content-Type', 'application/xml')
    token.then(function(result) {
    res.status = 200;
    result=`${result[0].serviceToken}`
    return res.send(`<?xml version="1.0"?><service_token><token>${result}</token></service_token>`);
         })
	})
})

module.exports = router;
