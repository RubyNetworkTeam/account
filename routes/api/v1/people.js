const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)

router.post('/', async (req, res, next) => {
	const target = req.body.person.user_id
	const pid = await query(`SELECT pid FROM accounts ORDER BY pid DESC LIMIT 1`);
	await query(`INSERT INTO accounts(nnid, pid) VALUE("${target}", ${pid[0]+1})`);
	const userpid = await query(`SELECT pid FROM accounts WHERE nnid="${target}" ORDER BY pid DESC LIMIT 1`);
	res.status = 200;
	const rescon = `<?xml version="1.0"?><person><pid>${userpid[0]}</pid></person>`
	return res.send(rescon)
})

module.exports = router;