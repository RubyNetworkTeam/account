/**
 * @author CarlosNunezMX
 * @file login.ts
 */

// types
import type { User } from "../../../types/user";

import path from "path";
import fs from 'fs';

// router
import { Router } from "express";
export const owner_router = Router();

//db
import client from '../../../other/postgresqlConnection.js';
const LoginSQL = `SELECT * FROM accounts WHERE "nnid"='?'`

// secrets and security
import { nintendoPasswordHash } from "../../../other/hash.js";
import { InfoHelper } from "../../../helpers/info.js";

owner_router.get("/", async (req, res) => {
    const Header = req.headers["authorization"];
    const file = fs.readFileSync(path.resolve(process.cwd(), "../files/error.xml"));
    
    if (!Header) {
        res.status(400)
        return res.send(file)
    }

    const Token = Header.split('Basic ')[1];
    if(!Token){
        res.status(400)
        return res.send(file)
    }

    const [user, password] = atob(Token).split(" ");
    
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

    return res.xml(InfoHelper(account));
})


