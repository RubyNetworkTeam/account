const express = require('express')
const router = express.Router()
const path = require("path");

const { query } = require('../../../other/postgresqlConnection')

const fs = require('fs')
router.get('/', (req, res) => {
	res.status(200)
    return res.send(`<nex_token>
	<host>127.0.0.1</host>
	<nex_password>password</nex_password>
	<pid>1</pid>
	<port>1223</port>
	<token>oauth</token>
</nex_token>`);
})

module.exports = router;
