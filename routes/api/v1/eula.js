const express = require('express')
const path = require("path");
const router = express.Router()

const logger = require('../../../other/logger')

const fs = require('fs')

router.get('/', (req, res) => {
   const file = fs.readFileSync(path.resolve(__dirname, "../files/eula.xml"));
    res.send(file)
})

module.exports = router;