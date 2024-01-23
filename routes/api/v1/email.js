const { Router } = require('express')
const router = Router()
const path = require("path");
const { execSync } = require('child_process');

router.post('/', (req, res) => {
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
    res.json('')
})

module.exports = router;
