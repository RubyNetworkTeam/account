// types
import type { Request, Response } from "express"
import type { User } from "../../../types/user"

// imports
import express from 'express'
import client from '../../../other/postgresqlConnection.js'
import { FriendHelper } from "../../../helpers/friends.js"

const router = express.Router()


router.get('/', async (req: Request, res: Response) => {
    // TODO: Find how to type it.
    // @ts-ignore
    const rnid: string = req.query.input
    let target;
    target = rnid.split(',');
    const pid = await client.query<User>({text: `SELECT * FROM accounts WHERE "nnid"='${target[0]}'`});
    res.status(200);
    if (pid == undefined) {
        return res.xml(FriendHelper(rnid));
    }
    const [account] = pid.rows;
    return res.xml(FriendHelper(rnid, account));
})

export default router;
