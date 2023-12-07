const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)
const logger = require('../../../other/logger')

// Optimizations
router.put('/people/@me/miis/@primary', async (req, res) => {
    res.status = 200;
    const mii_name = req.body.mii.name
    const mii_hash1 = req.body.mii.data
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    await query(`UPDATE accounts SET screen_name = '${mii_name}', mii_hash1 = '${mii_hash1}' WHERE nnid = "${id[0].rnid}"`);
	return res.send('')
})

router.get('/miis', async (req, res) => {
    return res.send('<?xml version="1.0"?><miis><mii><data>AAAAQAJAOOSApDDg3PsHeK9dv9a1ngAAAUBOAGkAYwBrAGEAbABhAAAAAAAAAEBABgAMACAmoxQzMqUQpgoTZAwACCGAQUhQUwBhAHIAYQBoAAAAAAAAAAAAAAAAAKif</data><id>2300543275</id><images><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/normal_face.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/normal_face.png</url><type>standard</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/frustrated.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/frustrated.png</url><type>frustrated_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/smile_open_mouth.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/smile_open_mouth.png</url><type>happy_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/wink_left.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/wink_left.png</url><type>like_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/normal_face.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/normal_face.png</url><type>normal_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/sorrow.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/sorrow.png</url><type>puzzled_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/surprised_open_mouth.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/surprised_open_mouth.png</url><type>surprised_face</type></image><image><cached_url>https://pretendo-cdn.b-cdn.net/mii/1536590017/body.png</cached_url><id>2300543275</id><url>https://pretendo-cdn.b-cdn.net/mii/1536590017/body.png</url><type>whole_body</type></image></images><name>Nickala</name><pid>1536590017</pid><primary>Y</primary><user_id>PokeyManateeruby</user_id></mii></miis>')
})

module.exports = router;