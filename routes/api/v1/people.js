const express = require('express')
const path = require("path");
const router = express.Router()
const {XMLParser} = require("fast-xml-parser");
const util = require('util')
const con = require('../../../other/mysqlConnection')
var xmlparser = require('express-xml-bodyparser');

const query = util.promisify(con.query).bind(con)

const parser = new XMLParser();

const logger = require('../../../other/logger')

const fs = require('fs')

router.post('/', (req, res, next) => {
	const target = req.body.person.user_id
	res.set('Content-Type', 'application/xml')
	query(`INSERT INTO accounts(nnid, pid) VALUE("${target}", 1)`);
	const pid = query(`SELECT pid FROM accounts WHERE nnid="${target}" ORDER BY pid DESC LIMIT 1`);
	res.status = 200;
	const rescon = `<?xml version="1.0"?><person><pid>1</pid></person>`
	return res.send(rescon)
	pid.then(function(result) {
// 		res.status = 200;
//		const rescon = `<?xml version="1.0"?><person><pid>1</pid></person>`
//	    return res.send(rescon)
	})
})

module.exports = router;