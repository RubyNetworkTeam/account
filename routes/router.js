const v1_Router = require("./api/v1/router");

const {Router} = require("express");
const ApiRouter = Router();

ApiRouter.use("/api", v1_Router);

module.exports = ApiRouter;