const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)
const logger = require('../../../other/logger')
const {jwtSecret, refreshTokenSecret} = require("../../../config.json")
const { sign } = require("jsonwebtoken")

router.post('/', (req, res) => {
	const client_id = req.header("X-Nintendo-Client-ID")
	const password = req.body.password
	res.status = 200;
	const rnid = req.body.user_id
	const pass = query(`SELECT password FROM accounts WHERE nnid="${rnid}"`);
	const accesed = query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
	accesed.then(function (result) {
		if (result.length == 0) {
			query(`INSERT INTO last_accessed(rnid, id) VALUE("${rnid}", "${client_id}")`);
		} else {
			query(`UPDATE last_accessed SET rnid='${rnid}', id="${client_id}"`);
		}
	})
	pass.then(function (result) {

        if (result[0] == null) {
            return res.send("<errors> <error> <code>0106</code> <message>Invalid account ID or password</message> </error> </errors>")
        }
		if (result[0].password == password) {
			const token = sign({ rnid }, refreshTokenSecret, { expiresIn: 3600 });
			const refresh_token = sign({ rnid, time: Date.now() }, jwtSecret);
			return res.send(`<?xml version="1.0"?><OAuth20><access_token><token>${token}</token><refresh_token>${refresh_token}</refresh_token><expires_in>3600</expires_in></access_token></OAuth20>`)
		} else {
            console.log("Password MisMatch")
			return res.send("<errors> <error> <code>0106</code> <message>Invalid account ID or password</message> </error> </errors>")
		}
	})
})

module.exports = router;
