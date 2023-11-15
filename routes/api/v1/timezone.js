const express = require('express')
const path = require("path");
const router = express.Router()

const logger = require('../../../other/logger')

const fs = require('fs')

router.get('/', (req, res) => {
   const file = fs.readFileSync(path.resolve(__dirname, "../files/tz.xml"));

    res.set('Content-Type', 'text/xml')
    res.send(file)
    console.log(logger.Get("/v1/api/content/time_zones/US/en"))
})

module.exports = router;