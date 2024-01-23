const express = require('express')
const path = require("path");
const router = express.Router()

const fs = require('fs')

router.get('/', (req, res) => {
   const file = fs.readFileSync(path.resolve(__dirname, "../files/tz.xml"));

    res.set('Content-Type', 'text/xml')
    res.send(file)
})

module.exports = router;
