const {Router} = require("express")
const {readFileSync} = require("fs")
const Policy = Router();

Policy.get('/:var', (req, res) => {
    const file = readFileSync('routes/api/files/UNK.xml').toString()
    res.send(file)
})

module.exports = Policy