// types
import type { User } from '../../../types/user';
import type { Response } from 'express';
// imports
import { Router} from 'express';
import { resolve } from "path";
import { readFileSync } from 'fs';

import { nintendoPasswordHash } from "../../../other/hash.js";
import client from '../../../other/postgresqlConnection.js';
import { AccountCreatedError } from '../../../helpers/errors.js';
import { InfoHelper } from '../../../helpers/info.js';

const LoginSQL = `SELECT * FROM accounts WHERE "nnid"='?'`

const router = Router()

router.get('/:nnid', async (req, res: Response) => {
    const nnid = req.params.nnid;
    const exists = await client.query({text: `SELECT * FROM accounts WHERE "nnid"='${nnid}'`}); 
    if(exists.rows.length == 0){
       res.status(200);
       return res.send('');
	}
    res.status(400);
    res.xml(AccountCreatedError);
})

router.post('/owner', async (req, res) => {
    const Header = req.headers["authorization"];
    const file = readFileSync(resolve(__dirname, "../files/error.xml"));
    if (!Header) {
        res.status(400)
        return res.send(file)
    }

    const Token = Header.split('Basic ')[1];
    if(!Token){
        res.status(400)
        return res.send(file)
    }

    const [user, password] = Buffer.from(Token, 'base64').toString('utf-8').split(" ");
    
    if(!user || !password){
        res.status(400)
        return res.send(file)
    }

    const db_user = await client.query<User>({text: LoginSQL.replace('?', user)});
    const [account] = db_user.rows;
    if(!account){
        res.status(400)
        return res.send(file)
    }
    let passwordHashed = nintendoPasswordHash(password, account.pid);
    if(passwordHashed !== account.password){
        res.status(400)
        return res.send(file)
    }

    return res.xml(InfoHelper(account), {
        header: true
    })
})

export default router;
