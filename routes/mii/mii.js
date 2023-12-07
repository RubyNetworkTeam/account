var fetch
var addfetch = 0

try {
    fetch()
} catch (e) {
    if (e instanceof ReferenceError) {
        addfetch=1
    }
}

if(addfetch != 1 ) {
    fetch = require('node-fetch')
}

const express = require('express')
const router = express.Router()
const util = require('util')
const con = require('../../other/mysqlConnection')
const query = util.promisify(con.query).bind(con)
const logger = require('../../other/logger')
//thanks pretendo
/**
 * @author Pretendo Network Team
 * @link https://github.com/PretendoNetwork/mii-js
 */
const Mii = require('mii-js')

router.get('/:rpid/:file', async (req, res) => {
    const rpid = req.params.rpid;
    const file = req.params.file
    res.status = 200;
    const data = await query(`SELECT mii_hash1 FROM accounts WHERE pid="${rpid}"`)
    if (data.length == 0) {
    res.status = 404
    return res.send(`<html><body><style type="text/css">p {word-wrap: break-word;}</style><center><h1 style="font-family: tahoma;">|___=+404+=___|</h1></center><p id="d"></p><script>window.setInterval("document.getElementById('d').innerHTML +=' &#'+Math.floor((Math.random() * 10000) + 1)+';';", 100);</script></body></html>`)
    }
    const mii_data = data[0].mii_hash1
    const mii = new Mii(Buffer.from(mii_data, 'base64'))
    let studioUrl = mii.studioUrl()
    const request = await fetch(studioUrl);
    const out = await request.arrayBuffer()
    const buff = Buffer.from(out)
   res.writeHead(200, {
     'Content-Type': 'image/png'
   });
   res.end(buff)
})

module.exports = router;
