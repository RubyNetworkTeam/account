const v1_Router = require("./api/v1/router");

const {Router} = require("express");
const { EndPointRouter } = require("./endpoint/router");
const { TopicRouter } = require("./topics/router");
const ApiRouter = Router();

const {jwtSecret} = require("../config.json");

if(!jwtSecret)
    throw new Error("JsonWebTokens Secret isn't at config.json!")


ApiRouter.use("/api", v1_Router);
ApiRouter.use("/endpoint", EndPointRouter)
ApiRouter.use('/topics', TopicRouter)

module.exports = ApiRouter;