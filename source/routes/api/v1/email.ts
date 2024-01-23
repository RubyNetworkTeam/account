// types
import type {Request, Response} from 'express';

// imports
import { Router } from 'express';
import { execSync } from 'child_process';

import { Error, Info } from '../../../other/logger.js';

const router = Router()

router.post('/', (req: Request, res: Response) => {
    const email: string = req.body.email;
    const domain = String(email).substring(email.lastIndexOf("@") + 1)
    try {
        const ping = execSync(`ping -c 1 ${domain}`, {
            stdio: 'pipe'
        })
        console.log(
            Info(ping.toString())
        );

    } catch (err) {
        // @ts-ignore
        console.error(Error(err));
    }
    res.send("");
})

router.get('/', (_, res) => {
    res.json('')
})

export default router;
