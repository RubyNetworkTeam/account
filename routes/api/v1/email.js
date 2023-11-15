const express = require('express') 
const path = require("path"); 
const router = express.Router() 
const logger = require('../../../other/logger')

router.post('/', (req, res) => {
    console.log(logger.Post("/v1/api/support/validate/email"))
    const email = req.body.email
    const domain = String(email).substring(email.lastIndexOf("@") +1)
    var exec = require('child_process').exec
    exec(`ping -c 1 ${domain}`, function (err, stdout, stderr) {
    console.log(stderr)
    console.log(stdout)
    });
    res.send("")
})

router.get('/', (req, res) => {
	console.log(logger.Get("/v1/api/admin/time"))
    res.send("")
})

module.exports = router;
