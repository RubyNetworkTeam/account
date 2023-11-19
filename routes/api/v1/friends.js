const express = require('express')
const router = express.Router()

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', async (req, res) => {
    const rnid = req.query.input
    let target;
    target = rnid.split(',')
    console.log(logger.Get("/v1/api/admin/mapped_ids?input_type=user_id&output_type=pid&input=" + target[0]))
    const pid = await query(`SELECT pid FROM accounts WHERE nnid="${target[0]}"`);
    res.status = 200;
    if (pid.length == 0) {
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
        <out_id>${pid[0].pid}</out_id>
    </mapped_id>
</mapped_ids>`);
})

module.exports = router;
