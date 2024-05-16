const express = require('express')
const router = express.Router()

const { query } = require('../../../other/postgresqlConnection')

router.get('/', async (req, res) => {
    const rnid = req.query.input
    let target;
    target = rnid.split(',')
    const pid = await query(`SELECT * FROM accounts WHERE "nnid"='${target[0]}'`)
    res.status = 200;
    if (pid.rows[0] == undefined) {
        return res.send(`<mapped_ids>
    <mapped_id>
        <in_id>${rnid}</in_id>
        <out_id><out_id />
    </mapped_id>
</mapped_ids>`);
    }
    return res.send(`<mapped_ids>
    <mapped_id>
        <in_id>${rnid}</in_id>
        <out_id>${pid.rows[0].pid}</out_id>
    </mapped_id>
</mapped_ids>`);
})

module.exports = router;
