const express = require('express')
const router = express.Router()
const {XMLParser} = require("fast-xml-parser");
const util = require('util')
const con = require('../../../other/mysqlConnection')
const xmlparser = require('express-xml-bodyparser');

const query = util.promisify(con.query).bind(con)

const parser = new XMLParser();

const logger = require('../../../other/logger')

router.put('/', (req, res) => {
	res.set('Content-Type', 'application/xml')
    console.log(logger.Put("/v1/api/people/@me/miis/@primary"))
	res.status = 200;
    const mii_name = req.body.mii.name
    const mii_hash1 = req.body.mii.data
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    id.then(function(result) {
    query(`UPDATE accounts SET screen_name = '${mii_name}', mii_hash1 = '${mii_hash1}' WHERE nnid = "${result[0].rnid}"`);
	})
	return res.send('')
})

module.exports = router;