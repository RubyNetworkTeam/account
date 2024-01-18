import express from 'express';
import type { Request, Response } from "express";

const router = express.Router()

import query from '../../../other/postgresqlConnection';
import { nintendoPasswordHash } from "../../../other/hash";

type PeopleBody = {
	person: {
		email: {
			address: string;
		};
		user_id: string;
		mii: {
			date: string;
			name: string;
		};
		gender: string;
		birth_date: string;
		country: string;
		language: string;
		tz_name: string;
		region: string;
		password: string;
	}
}

router.post('/', async (req: Request, res: Response) => {
	const body: PeopleBody = req.body;
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
	var password = body.person.password;
	var pid = await query({text: 'SELECT * FROM accounts ORDER BY pid DESC LIMIT 1'});
	pid=pid.rows[0].pid+1
	if(pid == null) {
		pid=0
	}
	password = nintendoPasswordHash(password, pid)
	await query(`INSERT INTO accounts(pid, mii_hash1, nnid, screen_name, gender, birth_date, create_date, email, country, utc_offset, language, mii_url, tz_name, update_time, region, serviceToken, password) VALUES(${pid+1}, "${mii_hash}", "${rnid}", "${screen_name}", "${gender}", "${create_date}", "${email}", "${country}", "${utc_offset}", "${language}", "http://mii.genebelcher.com/mii/${pid}/standard.tga", "${tz_name}", "${create_date}", "${region}", "", "${password}")`);
	const rescon = `<?xml version="1.0"?><person><pid>${pid}</pid></person>`
	return res.send(rescon)
})

module.exports = router;
