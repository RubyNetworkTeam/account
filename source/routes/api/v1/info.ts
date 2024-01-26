// types
import type { User } from '../../../types/user';
import type { Request, Response } from 'express';
// imports
import express from 'express';
import { nintendoPasswordHash } from '../../../other/hash.js';
import client from '../../../other/postgresqlConnection.js';
import { ProfileError } from '../../../helpers/errors.js';
import { InfoHelper } from '../../../helpers/info.js';

const router = express.Router()

type rnid_query = {
    rnid: string;
}

router.get('/profile', async (req, res) => {
    res.status(200);
    const client_id = req.header("X-Nintendo-Client-ID");
    const id = await client.query<rnid_query>({text: `SELECT rnid FROM last_accessed WHERE "id"='${client_id}'`});
    const account_query = await client.query<User>({text: `SELECT * FROM accounts WHERE "nnid"='${id.rows[0].rnid}'`});
    if (account_query.rows.length == 0) {
        return res.xml(ProfileError);
    }
    const [account] = account_query.rows;
    return res.xml(InfoHelper(account))
})


router.put('/', async (req: Request, res: Response) => {
    res.status(200);
    const password = req.body.person.password;
    const client_id = req.header("X-Nintendo-Client-ID");
    
    const id = await client.query({text: `SELECT * FROM last_accessed WHERE "id"='${client_id}'`});
    const pid = await client.query<User>({text: `SELECT * FROM accounts WHERE "nnid"='${id}'`});
    const passwordHash = nintendoPasswordHash(password, pid.rows[0].pid);
    await client.query(`UPDATE accounts SET password = '${passwordHash}' WHERE "nnid"='${id.rows[0].rnid}'`);
    return res.send('')
})

export default router;
