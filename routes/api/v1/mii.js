const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)
const logger = require('../../../other/logger')

// Optimizations
router.put('/', async (req, res) => {
    console.log(logger.Put("/v1/api/people/@me/miis/@primary"))
	res.status = 200;
    const mii_name = req.body.mii.name
    const mii_hash1 = req.body.mii.data
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    await query(`UPDATE accounts SET screen_name = '${mii_name}', mii_hash1 = '${mii_hash1}' WHERE nnid = "${id[0].rnid}"`);
	return res.send('')
})

module.exports = router;