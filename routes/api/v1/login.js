/**
 * @author CarlosNunezMX
 * @file owner.js
 */

const path = require("path");
const fs = require('fs')

// router
const { Router } = require("express");
const owner_router = Router();

//db
const {promisify} = require('util')
const con = require('../../../other/mysqlConnection')
const query = promisify(con.query).bind(con)
const LoginSQL = `SELECT * FROM accounts WHERE nnid="?"`

// secrets and security
const { nintendoPasswordHash } = require("../../../other/hash");

owner_router.get("/", async (req, res) => {
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

    const [user, password] = atob(Token).split(" ");
    
    if(!user || !password){
        res.status(400)
        return res.send(file)
    }

    /**
     * @type {import("../../../types/User").User[]}
     */
    const db_user = await query(LoginSQL.replace('?', user));
    const account = db_user
    if(db_user.length == 0){
        res.status(400)
        return res.send(file)
    }
    const [_user] = db_user;
    let passwordHashed = nintendoPasswordHash(password);
    if(passwordHashed !== _user.password){
        res.status(400)
        return res.send(file)
    }

    return res.send(`<?xml version="1.0"?><person><active_flag>Y</active_flag><birth_date>${account[0].birth_date}</birth_date><country>${account[0].country}</country><create_date>${account[0].create_date}</create_date><device_attributes/><gender>${account[0].gender}</gender><language>${account[0].language}</language><updated>${account[0].update_time}</updated><marketing_flag>N</marketing_flag><off_device_flag>Y</off_device_flag><pid>${account[0].pid}</pid><email><address>${account[0].email}</address><id>2425205774</id><parent>N</parent><primary>Y</primary><reachable>Y</reachable><type>DEFAULT</type><updated_by>USER</updated_by><validated>Y</validated><validated_date/></email><mii><status>COMPLETED</status><data>${account[0].mii_hash1}</data><id>1816791782</id><mii_hash>${account[0].mii_hash2}</mii_hash><mii_images><mii_image><cached_url>${account[0].mii_url}</cached_url><id>1</id><url>${account[0].mii_url}</url><type>standard</type></mii_image></mii_images><name>${account[0].screen_name}</name><primary>N</primary></mii><region>${account[0].region}</region><tz_name>${account[0].tz_name}</tz_name><user_id>${account[0].nnid}</user_id><utc_offset>${account[0].utc_offset}</utc_offset></person>`)
})

module.exports = { owner_router }
