import { Request, Response, Router } from 'express';
import path from "path";
import { execSync } from 'child_process';

import { Error } from '../../../other/logger';

const router = Router()

router.post('/', (req: Request, res: Response) => {
    const email: string = req.body.email;
    const domain = String(email).substring(email.lastIndexOf("@") + 1)
    try {
        const ping = execSync(`ping -c 1 ${domain}`, {
            stdio: 'pipe'
        })
        console.log(
            Error(ping.toString())
        );

    } catch (err) {
        console.error(Error(err));
    }
    res.send("");
})

router.get('/', (req, res) => {
    res.json('')
})

export default router;
