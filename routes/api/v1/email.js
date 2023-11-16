const { Router } = require('express')
const router = Router()
const path = require("path");
const logger = require('../../../other/logger');
const { execSync } = require('child_process');

router.post('/', (req, res) => {
    console.log(logger.Post("/v1/api/support/validate/email"))
    const email = req.body.email
    const domain = String(email).substring(email.lastIndexOf("@") + 1)
    try {
        const ping = execSync(`ping -c 1 ${domain}`, {
            stdio: 'pipe'
        })
        console.log(ping.toString())
    }catch(err){
        console.error(err);
    }
    res.send("")
})

router.get('/', (req, res) => {
    console.log(logger.Get("/v1/api/admin/time"))
    res.json('')
})

module.exports = router;
