const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)
var crypto = require('crypto');
var hash = crypto.createHash('sha256');

router.get('/profile', (req, res) => {
    res.set('Content-Type', 'application/xml')
    console.log(logger.Get("/v1/api/people/@me/profile"))
	res.status = 200;
	const client_id = req.header("X-Nintendo-Client-ID")
    const id = query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    var rnid;
    id.then(function(result) {
        const account = query(`SELECT * FROM accounts WHERE nnid="${result[0].rnid}"`);
        account.then(function(result) {
        if(result[0].length == 0){
         return res.send(`<errors>  <error>     <code>0106</code>    <message>Invalid account ID or password</message> </error> </errors>`);
    }
    return res.send(`<?xml version="1.0"?><person><active_flag>Y</active_flag><birth_date>${result[0].birth_date}</birth_date><country>${result[0].country}</country><create_date>${result[0].create_date}</create_date><device_attributes/><gender>${result[0].gender}</gender><language>${result[0].language}</language><updated>${result[0].update_time}</updated><marketing_flag>N</marketing_flag><off_device_flag>Y</off_device_flag><pid>${result[0].pid}</pid><email><address>${result[0].email}</address><id>2425205774</id><parent>N</parent><primary>Y</primary><reachable>Y</reachable><type>DEFAULT</type><updated_by>USER</updated_by><validated>Y</validated><validated_date/></email><mii><status>COMPLETED</status><data>${result[0].mii_hash1}</data><id>1816791782</id><mii_hash>${result[0].mii_hash2}</mii_hash><mii_images><mii_image><cached_url>${result[0].mii_url}</cached_url><id>1</id><url>${result[0].mii_url}</url><type>standard</type></mii_image></mii_images><name>${result[0].screen_name}</name><primary>N</primary></mii><region>${result[0].region}</region><tz_name>${result[0].tz_name}</tz_name><user_id>${result[0].nnid}</user_id><utc_offset>${result[0].utc_offset}</utc_offset></person>`)
            })
        })
    })


router.put('/', (req, res) => {
	res.set('Content-Type', 'application/xml')
    console.log(logger.Put("/v1/api/people/@me/"))
	res.status = 200;
    const password = req.body.person.password
    data=hash.update(password[0], 'utf-8');
	hashed_pass=data.digest('hex');
    console.log(logger.Info(hashed_pass))
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = query(`SELECT rnid FROM last_accessed WHERE id="${client_id}"`);
    id.then(function(result) {
         query(`UPDATE accounts SET password = '${password[0]}' WHERE nnid = "${result[0].rnid}"`);
    })
    return res.send('')
})

module.exports = router;
