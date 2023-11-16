const express = require('express')
const router = express.Router()

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/:nnid', async (req, res) => {
    const nnid = req.params.nnid;
    console.log(logger.Get("/v1/api/people/"+nnid))
    const exists = await query(`SELECT * FROM accounts WHERE nnid="${nnid}"`);
    if(exists.length == 0){
       res.status = 200;
        return res.send('');
	}
    res.status = 400;
    return res.send('<?xml version="1.0"?><errors><error><code>0100</code><message>Account ID already exists</message></error></errors>')
})

module.exports = router;
