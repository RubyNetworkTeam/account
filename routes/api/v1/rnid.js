const express = require('express')
const router = express.Router()

const path = require("path");
const fs = require('fs')

const LoginSQL = `SELECT * FROM accounts WHERE "nnid"='?'`
const { nintendoPasswordHash } = require("../../../other/hash");

const { query } = require('../../../other/postgresqlConnection')

router.get('/:nnid', async (req, res) => {
    const nnid = req.params.nnid;
    const exists = await query(`SELECT * FROM accounts WHERE "nnid"='${nnid}'`); 
    if(exists.rows.length == 0){
       res.status = 200;
        return res.send('');
	}
    res.status = 400;
    return res.send('<?xml version="1.0"?><errors><error><code>0100</code><message>Account ID already exists</message></error></errors>')
})

router.post('/', async (req, res) => {
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
	if(pid.rows[0] == null) {
		pid=1
	} else {
		pid=pid.rows[0].pid+1
	}
        password = nintendoPasswordHash(password, pid)
        const quer = `INSERT INTO accounts("pid", "mii_data", "nnid", "screen_name", "gender", "birth_date", "email", "country", "utc_offset", "language", "mii_url", "tz_name", "update_time", "region", "password") VALUES(${pid}, '${mii_hash}', '${rnid}', '${screen_name}', '${gender}', '${birth_date}', '${email}', '${country}', '${utc_offset}', '${language}', 'http://mii.wuhuisland.xyz/mii/${pid}/standard.tga', '${tz_name}', '${birth_date}', '${region}', '${password}')`
	console.log(quer)
	await query(quer)
        const rescon = `<?xml version="1.0"?><person><pid>${pid}</pid></person>`
        return res.send(rescon)
})

router.post('/owner', async (req, res) => {
    const Header = req.headers["authorization"];
    const file = fs.readFileSync(path.resolve(__dirname, "../files/error.xml"));
    if (!Header) {
        res.status(400)
        return res.send(file)
    }

    const Token = Header.split('Basic ')[1];
    if(!Token){
        res.status(400)
        return res.send(file)
    }

    const [user, password] = Token.split(" ");
    
    if(!user || !password){
        res.status(400)
        return res.send(file)
    }

    /**
     * @type {import("../../../types/User").User[]}
     */
    const db_user = await query(LoginSQL.replace('?', user));
    const account = db_user.rows
    if(db_user.rows.length == 0){
        res.status(400)
        return res.send(file)
    }
    let passwordHashed = nintendoPasswordHash(password, account[0].pid);
    if(passwordHashed !== _user.password){
        res.status(400)
        return res.send(file)
    }

    return res.send(`<?xml version="1.0"?><person><active_flag>Y</active_flag><birth_date>${account[0].birth_date}</birth_date><country>${account[0].country}</country><create_date>${account[0].create_date}</create_date><device_attributes/><gender>${account[0].gender}</gender><language>${account[0].language}</language><updated>${account[0].update_time}</updated><marketing_flag>N</marketing_flag><off_device_flag>Y</off_device_flag><pid>${account[0].pid}</pid><email><address>${account[0].email}</address><id>2425205774</id><parent>N</parent><primary>Y</primary><reachable>Y</reachable><type>DEFAULT</type><updated_by>USER</updated_by><validated>Y</validated><validated_date/></email><mii><status>COMPLETED</status><data>${account[0].mii_data}</data><id>1816791782</id><mii_hash>${account[0].mii_hash2}</mii_hash><mii_images><mii_image><cached_url>${account[0].mii_url}</cached_url><id>1</id><url>${account[0].mii_url}</url><type>standard</type></mii_image></mii_images><name>${account[0].screen_name}</name><primary>N</primary></mii><region>${account[0].region}</region><tz_name>${account[0].tz_name}</tz_name><user_id>${account[0].nnid}</user_id><utc_offset>${account[0].utc_offset}</utc_offset></person>`)
})

module.exports = router;
