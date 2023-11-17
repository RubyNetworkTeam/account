const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', (req, res) => {
	console.log(logger.Get("/v1/api/provider/nex_token/@me"))
    res.status = 200;
//   return res.send(`<errors>
//	<error>
//		<code>0123</code>
// 		<message>Service has expired</message>
//	</error>
// </errors>`)
    return res.send(`<nex_token>
	<host>olv.genebelcher.com</host>
	<nex_password>landonc0511</nex_password>
	<pid>1739386479</pid>
	<port>654</port>
	<token>oauth</token>
</nex_token>`);
})

module.exports = router;
