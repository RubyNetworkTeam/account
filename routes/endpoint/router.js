const {Router} = require('express');
const Policy = require('./endpoint');
const EndPointRouter = Router();

EndPointRouter.use('/p01/policylist/1/1', Policy);

module.exports = {EndPointRouter}