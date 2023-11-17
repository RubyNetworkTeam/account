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
    console.log(logger.Get(`/mii/${rpid}/${file}`))
    res.status = 200;
    const data = await query(`SELECT mii_hash1 FROM accounts WHERE pid="${rpid}"`)
    if (data.length == 0) {
    res.status = 404
    // This could be optimizied, but Rubies doesnt give me permission :D
    return res.send(`<html><body><style type="text/css">p {word-wrap: break-word;}</style><center><h1 style="font-family: tahoma;">|___=+404+=___|</h1></center><p id="d"></p><script>window.setInterval("document.getElementById('d').innerHTML +=' &#'+Math.floor((Math.random() * 10000) + 1)+';';", 100);</script></body></html>`)
    }
    const mii_data = data[0].mii_hash1
    const mii = new Mii(Buffer.from(mii_data, 'base64'))
    let studioUrl = mii.studioUrl()
    // Universal fix. example arch linux hasn't curl command
    // and make more faster, because you arent creating and destroying process
    // see ya!
    const request = await fetch(studioUrl);
    const _mata = await request.arrayBuffer()
    const _out = new Uint8Array(_mata)
    //   const out = execSync(`curl "${studioUrl}"`, {
    //           stdio: 'pipe'
    //   })
    //   console.log(out);
    //  const mata = out.toString('base64')

    //  var img = Buffer.from(mata, 'base64');
   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': _out.length
   });
   res.end(_out)
})

module.exports = router;
