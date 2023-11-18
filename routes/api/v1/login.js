/**
 * @author CarlosNunezMX
 * @file owner.js
 */

const LoginSQL = `SELECT * FROM accounts WHERE nnid="?"`

const { Router } = require("express");
const { create } = require("xmlbuilder2")
const xmlmiddleware = require("../../../middlewares/xml.middleware");
const { xmlError } = require("../../../other/error");
const owner_router = Router();
const {sign} = require("jsonwebtoken");

owner_router.get("/", xmlmiddleware, (req, res) => {
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

    // Here put the db logic to get the user
    /**
     * @type {import("../../../types/User").User[]}
     */
    const db_user = [{nnid: "PokerManatee" , password: "unknown"}]

    if(db_user.length == 0){
        res.status(400)
        return res.send(xmlError({
            code: '1105',
            message: "User invalid or not fount."
        }));
    }
    const [_user] = db_user;
    // hash logic here
    let passwordisHashed = _user.password === passowrd;
    if(!passwordisHashed){
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