const v1_Router = require("./api/v1/router");
const endpointRoute = require("./api/v1/endpoint");
const {Router} = require("express");
const ApiRouter = Router();

const {jwtSecret} = require("../config.json");

ApiRouter.use("/api", v1_Router);
ApiRouter.use("/endpoint", endpointRoute);
module.exports = ApiRouter;
