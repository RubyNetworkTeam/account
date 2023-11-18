const {Router} = require('express');
const Policy = require('./endpoint');
const XMLMiddleware = require("../../middlewares/xml.middleware")
const EndPointRouter = Router();

EndPointRouter.use('/p01/policylist/1/1', XMLMiddleware, Policy);

module.exports = {EndPointRouter}