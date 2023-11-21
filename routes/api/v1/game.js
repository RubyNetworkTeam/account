const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', (req, res) => {
	res.status(200)
    return res.send(`<nex_token>
	<host>72.204.114.65</host>
	<nex_password>example</nex_password>
	<pid>2</pid>
	<port>655</port>
	<token>oauth</token>
</nex_token>`);
})

module.exports = router;
