const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', async(req, res) => {
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    const token = await query(`SELECT serviceToken FROM accounts WHERE nnid="${id[0].rnid}"`);
    res.status = 200;
    result= token[0].serviceToken ?? "";
    return res.send(`<?xml version="1.0"?><service_token><token>${result}</token></service_token>`);
})

module.exports = router;
