const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/:nnid', (req, res) => {
    const nnid = req.params.nnid;
    console.log(logger.Get("/v1/api/people/"+nnid))
    const exists = query(`SELECT * FROM accounts WHERE nnid="${nnid}"`);

    res.set('Content-Type', 'application/xml')
    exists.then(function(result) {
    if(result.length == 0){
    res.status = 200;
    return res.send('');
	}
    res.status = 400;
    return res.send('<?xml version="1.0"?><errors><error><code>0100</code><message>Account ID already exists</message></error></errors>')
    })
})

module.exports = router;
