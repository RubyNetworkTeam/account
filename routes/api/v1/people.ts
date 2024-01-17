import type { Request, Response } from "express";

const express = require('express')
const router = express.Router()
const { query } = require('../../../other/postgresqlConnection')
const { nintendoPasswordHash } = require("../../../other/hash");

router.post('/', async (req: Request, res: Response) => {
	const email = req.body.person.email.address
	const rnid = req.body.person.user_id
	const mii_hash = req.body.person.mii.date
	const screen_name = req.body.person.mii.name
	const gender = req.body.person.gender
	const birth_date = req.body.person.birth_date
	const country = req.body.person.country
	const create_date = Date.now()
	const utc_offset = 0
	const language = req.body.person.language
	const tz_name = req.body.person.tz_name
	const region = req.body.person.region
	var password = req.body.person.password
	var pid = await query(`SELECT * FROM accounts ORDER BY pid DESC LIMIT 1`);
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
