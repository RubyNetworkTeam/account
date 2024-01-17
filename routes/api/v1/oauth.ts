import type { Request, Response } from "express"
import express from 'express'


import query from '../../../other/postgresqlConnection'
import { jwtSecret, refreshTokenSecret } from "../../../config.json"
import { sign } from "jsonwebtoken"
import type { User } from "../../../types/user"
import { AccountOauthError, ProfileError } from "../../../helpers/errors"
import { OAuthHelper } from "../../../helpers/oauth"

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
	const client_id = req.header("X-Nintendo-Client-ID")
	const password = req.body.password
	const rnid = req.body.user_id;
	const pass = query<User>({ text: `SELECT * FROM accounts WHERE "nnid"='${rnid}'` });
	const accesed = query({ text: `SELECT * FROM last_accessed WHERE "id"='${client_id}'` });
	accesed.then(function (result) {
		if (result.rows.length == 0) {
			query({ text: `INSERT INTO last_accessed(rnid, id) VALUE("${rnid}", "${client_id}")` });
		} else {
			query({ text: `UPDATE last_accessed SET "rnid"='${rnid}', "id"='${client_id}'` });
		}
	})
	pass.then(function (result) {
		const [account] = result.rows;
		if (account.password == null) {
			return res.xml(AccountOauthError);
		}
		if (account.password == password) {
			const token = sign({ rnid }, refreshTokenSecret, { expiresIn: 3600 });
			const refresh_token = sign({ rnid, time: Date.now() }, jwtSecret);
			return res.xml(OAuthHelper(token, refresh_token), {
				header: true
			})
		}
		return res.xml(ProfileError);
	})
})

module.exports = router;
