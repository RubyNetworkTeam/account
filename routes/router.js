const v1_Router = require("./api/v1/router");

const {Router} = require("express");
const ApiRouter = Router();

ApiRouter.use(v1_Router, "/api");

module.exports = ApiRouter;