// types
import type { Request, Response } from "express"
import type { User } from "../../../types/user"

//imports
import express from 'express'

import jwt from "jsonwebtoken"
const sign = jwt.sign

import client from '../../../other/postgresqlConnection.js'
import { AccountOauthError, ProfileError } from "../../../helpers/errors.js"
import { OAuthHelper } from "../../../helpers/oauth.js"

// importing configs
import { default as config } from "../../../../config.json" assert {type: "json"}
const jwtSecret = config.jwtSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
	var client_id = req.header("X-Nintendo-Client-ID")
	if(client_id == undefined) {
		res.status(400)
		return res.send("No ClientID")
	}
	const password = req.body.password
	const rnid = req.body.user_id;
	const pass = client.query<User>({ text: `SELECT * FROM accounts WHERE "nnid"='${rnid}'` });
	const accesed = client.query({ text: `SELECT * FROM last_accessed WHERE "id"='${client_id}'` });
	// TODO: Add types
	// @ts-ignore
	accesed.then(function (result) {
		if (result.rows.length == 0) {
			client.query({ text: `INSERT INTO last_accessed("rnid", "id") VALUES('${rnid}', '${client_id}')` });
		} else {
			client.query({ text: `UPDATE last_accessed SET "rnid"='${rnid}', "id"='${client_id}'` });
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

export default router;
