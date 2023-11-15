const colors = require('colors')
const moment = require('moment')
const fetch = require('node-fetch')

const config = require('../config.json')

function Get(input) {
    return `(${moment().format("HH:mm:ss")}) [GET] ${input}`.green
}

function Info(input) {
    return `(${moment().format("HH:mm:ss")}) [INFO] ${input}`.green
}

function MySQL(input) {
    return `(${moment().format("HH:mm:ss")}) [MYSQL] ${input}`.blue
}

function Error(input) {
    return `(${moment().format("HH:mm:ss")}) [ERROR] ${input}`.red
}

function Put(input) {
    return `(${moment().format("HH:mm:ss")}) [PUT] ${input}`.magenta
}

function Delete(input) {
    return `(${moment().format("HH:mm:ss")}) [DELETE] ${input}`.white
}

function Post(input) {
    return `(${moment().format("HH:mm:ss")}) [POST] ${input}`.yellow
}

module.exports = {
    Get,
    Post,
    Info,
    MySQL,
    Error,
    Put,
    Delete
}
