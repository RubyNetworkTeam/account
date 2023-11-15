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
    res.status = 200;
    return res.send(`<nex_token>
    <host>159.203.102.56</host>
    <nex_password>5C5tJGIvuD2XcIrJ</nex_password>
    <pid>1536590017</pid>
    <port>60000</port>
    <token>reW86aypeaWECkDIk24887CK/yiWyeld+8NgT7VsK1DoKpVu</token>
</nex_token>`);
})

module.exports = router;
