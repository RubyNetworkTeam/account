const express = require('express')
const router = express.Router()
const path = require("path");

const logger = require('../../../other/logger')
const con = require('../../../other/mysqlConnection')

const fs = require('fs')
const util = require('util')
const query = util.promisify(con.query).bind(con)

router.get('/', (req, res) => {
    const rnid = req.query.input
    var target;
    target = rnid.split(',')
    console.log(logger.Get("/v1/api/admin/mapped_ids?input_type=user_id&output_type=pid&input="+target[0]))
    const pid = query(`SELECT pid FROM accounts WHERE nnid="${target[0]}"`);
    res.set('Content-Type', 'application/xml')
    pid.then(function(result) {
    if(result.length == 0){
    res.status = 200;
    return res.send(`<mapped_ids>
    <mapped_id>
        <in_id>${rnid}</in_id>
        <out_id><out_id />
    </mapped_id>
</mapped_ids>`);
	}
    res.status = 200;
        return res.send(`<mapped_ids>
    <mapped_id>
        <in_id>prodtest</in_id>
        <out_id>${result[0].pid}</out_id>
    </mapped_id>
</mapped_ids>`);
    })
})

module.exports = router;
