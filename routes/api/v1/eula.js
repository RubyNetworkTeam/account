const express = require('express')
const path = require("path");
const router = express.Router()

const logger = require('../../../other/logger')

const fs = require('fs')

router.get('/', (req, res) => {
   const file = fs.readFileSync(path.resolve(__dirname, "../files/eula.xml"));

    res.set('Content-Type', 'text/xml')
    res.send(file)
    console.log(logger.Get("/v1/api/content/agreements/Nintendo-Network-EULA/US/@latest"))
})

module.exports = router;