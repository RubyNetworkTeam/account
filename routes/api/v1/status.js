const express = require('express')
const router = express.Router()
const path = require("path");

const fs = require('fs')

router.get('/', (req, res) => {

   const file = fs.readFileSync(path.resolve(__dirname, "../files/status.xml"));

   res.send(file)
})

module.exports = router;
