import express from 'express'
import type { Request, Response } from 'express';
import path from "path";
import fs from 'fs';

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
   const file = fs.readFileSync(path.resolve(process.cwd(), "../files/endpoint.xml"));

    res.set('Content-Type', 'text/xml')
    res.send(file)
})

export default router;
