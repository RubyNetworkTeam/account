const v1_Router = require("./api/v1/router");

const {Router} = require("express");
const { EndPointRouter } = require("./endpoint/router");
const ApiRouter = Router();

ApiRouter.use("/api", v1_Router);
ApiRouter.use("/endpoint", EndPointRouter)

module.exports = ApiRouter;