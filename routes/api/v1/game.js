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
    res.set('Content-Type', 'application/xml')
    res.status = 400;
    return res.send(`<errors>
	<error>
		<code>0123</code>
		<message>Service has expired</message>
	</error>
</errors>`)
//    res.status = 200;
//    return res.send(`<nex_token>
	<host>52.40.192.64</host>
	<nex_password>iu8aAEL4pBd8nt2d</nex_password>
	<pid>1739386479</pid>
	<port>60200</port>
	<token>LVxLuzp2/u4i5LiprRgeOv/Gwtxe8RR5T+XQTDPnmCn+zEZpbaok4CVYcncOI5glThYTN3uU8n2ac6zgSqLufoBNUiMj+lGuPrnfgfbzJl7legMJ4lye+rEEKjsti7f7z4lkYFV3nKQB6fBPd6yy08cLyDBlO9+bjtgWhr24Yfw=</token>
</nex_token>`);
})

module.exports = router;
