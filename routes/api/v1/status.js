const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')

const fs = require('fs')

router.get('/', (req, res) => {

   const file = fs.readFileSync(path.resolve(__dirname, "../files/status.xml"));

   res.send(file)
   console.log(logger.Get("/v1/api/devices/@current/status"))

})

module.exports = router;