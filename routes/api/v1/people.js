const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)

router.post('/', async (req, res, next) => {
	const target = req.body.person.user_id
	await query(`INSERT INTO accounts(nnid, pid) VALUE("${target}", 1)`);
	const pid = await query(`SELECT pid FROM accounts WHERE nnid="${target}" ORDER BY pid DESC LIMIT 1`);
	res.status = 200;
	const rescon = `<?xml version="1.0"?><person><pid>1</pid></person>`
	return res.send(rescon)
// 	pid.then(function(result) {
// 		res.status = 200;
//		const rescon = `<?xml version="1.0"?><person><pid>1</pid></person>`
//	    return res.send(rescon)
// 	})
})

module.exports = router;