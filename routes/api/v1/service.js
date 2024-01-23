const express = require('express')
const router = express.Router()
const path = require("path");

const { query } = require('../../../other/postgresqlConnection')

router.get('/', async(req, res) => {
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT * FROM last_accessed WHERE "id"='${client_id}'`);
    const token = await query(`SELECT * FROM accounts WHERE "nnid"='${id.rows[0].rnid}'`);
    res.status = 200;
    result= token.rows[0].servicetoken ?? "NoToken";
    console.log(`<?xml version="1.0"?><service_token><token>${result}</token></service_token>`)
    return res.send(`<?xml version="1.0"?><service_token><token>${result}</token></service_token>`);
})

module.exports = router;
