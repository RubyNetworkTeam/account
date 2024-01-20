// types
import type { Request, Response } from "express";
import type { User } from '../../../types/user';
import type { AccountInfoResponse } from "../../../types/account_info";

// imports
import express from 'express';
import query from '../../../other/postgresqlConnection.js';
import { nintendoPasswordHash } from "../../../other/hash.js";
import { PeopleHelper } from "../../../helpers/people.js";

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
	// account info
	const body: AccountInfoResponse = req.body;
	const email = body.person.email.address
	const rnid = body.person.user_id
	const mii_hash = body.person.mii.date
	const screen_name = body.person.mii.name
	const gender = body.person.gender
	const birth_date = body.person.birth_date
	const country = body.person.country
	const create_date = Date.now()
	const utc_offset = 0
	const language = body.person.language
	const tz_name = body.person.tz_name
	const region = body.person.region
	let password = body.person.password;

	// queries
	const pid_query = await query<User>({ text: 'SELECT * FROM accounts ORDER BY pid DESC LIMIT 1' });
	let pid = pid_query.rows[0].pid + 1;
	if (pid == null)
		pid = 0
	password = nintendoPasswordHash(password, pid)

	// TODO: take out the query into a function
	// FIX: Added birth_date to query
	await query({text: `INSERT INTO accounts(pid, mii_hash1, nnid, screen_name, gender, birth_date, create_date, email, country, utc_offset, language, mii_url, tz_name, update_time, region, serviceToken, password) VALUES(${pid + 1}, "${mii_hash}", "${rnid}", "${screen_name}", "${gender}", "${birth_date}" ,"${create_date}", "${email}", "${country}", "${utc_offset}", "${language}", "http://mii.genebelcher.com/mii/${pid}/standard.tga", "${tz_name}", "${create_date}", "${region}", "", "${password}")`});
	return res.xml(PeopleHelper(pid), {
		header: true
	})
})

export default router;
