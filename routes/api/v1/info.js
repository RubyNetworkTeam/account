const express = require('express')
const router = express.Router()
const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)
const { nintendoPasswordHash } = require('../../../other/hash');
const crypto = require('crypto');

router.get('/profile', async (req, res) => {
    res.status = 200;
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    let rnid;
    const account = await query(`SELECT * FROM accounts WHERE nnid="${id[0].rnid}"`);
    if (account[0].length == 0) {
        return res.send(`<errors>  <error>     <code>0106</code>    <message>Invalid account ID or password</message> </error> </errors>`);
    }
    return res.send(`<?xml version="1.0"?><person><active_flag>Y</active_flag><birth_date>${account[0].birth_date}</birth_date><country>${account[0].country}</country><create_date>${account[0].create_date}</create_date><device_attributes/><gender>${account[0].gender}</gender><language>${account[0].language}</language><updated>${account[0].update_time}</updated><marketing_flag>N</marketing_flag><off_device_flag>Y</off_device_flag><pid>${account[0].pid}</pid><email><address>${account[0].email}</address><id>2425205774</id><parent>N</parent><primary>Y</primary><reachable>Y</reachable><type>DEFAULT</type><updated_by>USER</updated_by><validated>Y</validated><validated_date/></email><mii><status>COMPLETED</status><data>${account[0].mii_hash1}</data><id>1816791782</id><mii_hash>${account[0].mii_hash2}</mii_hash><mii_images><mii_image><cached_url>${account[0].mii_url}</cached_url><id>1</id><url>${account[0].mii_url}</url><type>standard</type></mii_image></mii_images><name>${account[0].screen_name}</name><primary>N</primary></mii><region>${account[0].region}</region><tz_name>${account[0].tz_name}</tz_name><user_id>${account[0].nnid}</user_id><utc_offset>${account[0].utc_offset}</utc_offset></person>`)
})


router.put('/', async (req, res) => {
    res.status = 200;
    const password = req.body.person.password
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    const pid = await query(`SELECT pid FROM accounts WHERE nnid="${id}"`);
    const primaryPasswordHash = nintendoPasswordHash(password, pid);
    const passwordHash = await bcrypt.hash(primaryPasswordHash, 10);
    await query(`UPDATE accounts SET password = '${passwordHash}' WHERE nnid = "${id[0].rnid}"`);
    return res.send('')
})

module.exports = router;
