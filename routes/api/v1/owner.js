/**
 * @author CarlosNunezMX
 * @file owner.js
 */

const LoginSQL = `SELECT `

const { Router } = require("express");
const { create } = require("xmlbuilder2")
const xmlmiddleware = require("../../../middlewares/xml.middleware");
const { xmlError } = require("../../../other/error");
const owner_router = Router();
const {decode, verify} = require("jsonwebtoken");


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
            message: "Invalid authorization token"
        }));
    }

    const tkn = atob(Token);
    console.log(tkn)
    return res.send(
        create({version: '1.0'})
        .ele('status')
            .txt('ok!')
        .up()
        .toString()
    )
})

module.exports = { owner_router }