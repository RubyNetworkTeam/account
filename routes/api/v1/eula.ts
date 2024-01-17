import type { Request, Response } from "express";

const express = require('express')
const path = require("path");
const router = express.Router()

const fs = require('fs')

router.get('/', (req: Request, res: Response) => {
   const file = fs.readFileSync(path.resolve(process.cwd(), "../files/eula.xml"));
    res.send(file)
})

module.exports = router;
