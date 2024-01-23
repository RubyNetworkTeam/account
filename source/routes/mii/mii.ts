// types
import type { User } from '../../types/user';

//modules
import express from 'express';
//thanks pretendo
/**
 * @author Pretendo Network Team
 * @link https://github.com/PretendoNetwork/mii-js
 */
// @ts-ignore
import Mii from 'mii-js';

import query from '../../other/postgresqlConnection.js';

export const MiiRouter = express.Router()

MiiRouter.get('/:rpid/:file', async (req, res) => {
    const rpid = req.params.rpid;
    res.status(200);
    const data = await query<User>({text: `SELECT * FROM accounts WHERE "pid"='${rpid}'`})
    if (data.rows.length == 0) {
      res.status(404);
      return res.send(`<html><body><style type="text/css">p {word-wrap: break-word;}</style><center><h1 style="font-family: tahoma;">|___=+404+=___|</h1></center><p id="d"></p><script>window.setInterval("document.getElementById('d').innerHTML +=' &#'+Math.floor((Math.random() * 10000) + 1)+';';", 100);</script></body></html>`)
    }
    // it was mii_data
    const {mii_data} = data.rows[0];
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
