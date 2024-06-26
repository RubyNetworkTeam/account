const express = require('express')
const router = express.Router()
const { query } = require('../../../other/postgresqlConnection')
const {jwtSecret, refreshTokenSecret} = require("../../../config.json")
const { sign } = require("jsonwebtoken")

router.post('/', async (req, res) => {
	console.log(req)
	const client_id = req.header("X-Nintendo-Client-ID")
	const password = req.body.password
	res.status = 200;
	const rnid = req.body.user_id
	const pass = query(`SELECT * FROM accounts WHERE "nnid"='${rnid}'`);
	const accesed = query(`SELECT * FROM last_accessed WHERE "id"='${client_id}'`);
	accesed.then(function (result) {
		if (result.rows.length == 0) {
			query(`INSERT INTO last_accessed("rnid", "id") VALUES('${rnid}', '${client_id}')`);
		} else {
			query(`UPDATE last_accessed SET "rnid"='${rnid}', "id"='${client_id}'`);
		}
	})
	pass.then(function (result) {
	result = result.rows[0]
        if (result == null) {
            return res.send("<errors> <error> <code>0100</code> <message>Invalid account ID or password</message> </error> </errors>")
        }
		if (result.password == password) {
			const token = sign({ rnid }, refreshTokenSecret, { expiresIn: 3600 });
			const refresh_token = sign({ rnid, time: Date.now() }, jwtSecret);
			return res.send(`<?xml version="1.0"?><OAuth20><access_token><token>${token}</token><refresh_token>${refresh_token}</refresh_token><expires_in>3600</expires_in></access_token></OAuth20>`)
		} else {
			return res.send("<errors> <error> <code>0106</code> <message>Invalid account ID or password</message> </error> </errors>")
		}
	})
})

module.exports = router;
