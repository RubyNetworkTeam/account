import type { Request, Response } from "express";

import express from 'express';
const router = express.Router()


router.get('/', (_: Request, res: Response) => {
	res.status(200)
	return res.xml({
		nex_token: {
			host: "127.0.0.1",
			nex_password: 'password',
			pid: 1,
			port: 1223,
			token: "oauth"
		}
	});
})

export default router;
