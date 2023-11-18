/**
 * @author CarlosNunezMX
 * @file owner.js
 */


// router
const { Router } = require("express");
const owner_router = Router();

// xml
const { create } = require("xmlbuilder2")
const xmlmiddleware = require("../../../middlewares/xml.middleware");
const { xmlError } = require("../../../other/error");

//db
const {promisify} = require('util')
const con = require('../../../other/mysqlConnection')
const query = promisify(con.query).bind(con)
const LoginSQL = `SELECT * FROM accounts WHERE nnid="?"`

// secrets and security
const {sign} = require("jsonwebtoken");
const {jwtSecret} = require('../../../config.json')
const { nintendoPasswordHash } = require("../../../other/hash");

owner_router.get("/", xmlmiddleware, async (req, res) => {
    const Header = req.headers["authorization"];
    if (!Header) {
        res.status(400)
        return res.send(xmlError({
            code: '1105',
            message: 'No authorization token provided.'
        }));
    }

    const Token = Header.split('Basic ')[1];
    if(!Token){
        res.status(400)
        return res.send(xmlError({
            code: '1105',
            message: "Invalid authorization token."
        }));
    }

    const [user, passowrd] = atob(Token).split(" ");
    
    if(!user || !passowrd){
        res.status(400)
        return res.send(xmlError({
            code: '1105',
            message: "Invalid authorization token."
        }));
    }

    /**
     * @type {import("../../../types/User").User[]}
     */
    const db_user = await query(LoginSQL.replace('?', user));
    console.log(db_user);
    if(db_user.length == 0){
        res.status(400)
        return res.send(xmlError({
            code: '1105',
            message: "User invalid or not fount."
        }));
    }
    const [_user] = db_user;
    let passwordisHashed = nintendoPasswordHash(passowrd);
    if(passwordisHashed !== _user.password){
        res.status(400)
        return res.send(
            xmlError(
                {
                    code: '1105',
                    message: 'Email address, username, or password, is not valid.'
                }
            )
        )
    }

    const token = sign({ user, time: Date.now() }, jwtSecret)
    return res.send(
        create({version: '1.0'})
        .ele('status')
            .txt('ok!')
        .ele('credentials')
            .txt([user, passowrd].toString())
        .up()
        .up()
        .toString()
    )
})

module.exports = { owner_router }