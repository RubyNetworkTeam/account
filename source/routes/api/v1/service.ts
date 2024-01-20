import type { Request, Response } from 'express';

import express from 'express';
import query from '../../../other/postgresqlConnection.js';
import { ServiceTokenHelper } from '../../../helpers/oauth.js';

const router = express.Router()

router.get('/', async(req: Request, res: Response) => {
    const client_id = req.header("X-Nintendo-Client-ID")
    const id = await query({text: `SELECT * FROM last_accessed WHERE "id"='${client_id}'`});
    const token = await query({text: `SELECT * FROM accounts WHERE "nnid"='${id.rows[0].rnid}'`});
    res.status(200);
    /** TODO: URGENT - Type that*/
    // @ts-ignore
    const result = token.rows.serviceToken ?? "";
    return res.xml(ServiceTokenHelper(result), {
        header: true
    });
})

export default router;
