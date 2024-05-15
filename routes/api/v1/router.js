// Router for /api/v1

const eulaRoute = require('./eula')
const statusRoute = require('./status')
const timezoneRoute = require('./timezone')
const rnidRoute = require('./rnid')
const emailRoute = require('./email')
const peopleRoute = require('./people')
const serviceRoute = require('./oauth')
const infoRoute = require('./info')
const gameRoute = require('./game')
const friendRoute = require('./friends')
const miiRoute = require('./mii')
const tokenRoute = require('./service')

// Import express router

const {Router} = require("express");
const { owner_router } = require('./login')
const v1_Router = Router(); 

v1_Router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/xml');
    next();
})

v1_Router.use('/content/agreements/Nintendo-Network-EULA/:var/@latest', eulaRoute)
v1_Router.use('/devices/@current/status', statusRoute)
v1_Router.use('/content/time_zones/:var/:var', timezoneRoute)
//v1_Router.use('/people', rnidRoute)
//v1_Router.use('/people/@me/devices/', rnidRoute)
v1_Router.use('/support/validate/email', emailRoute)
v1_Router.use('/admin/time', emailRoute)
v1_Router.use('/people/', peopleRoute)
v1_Router.use('/oauth20/access_token/generate', serviceRoute)
v1_Router.use('/people/@me/profile', infoRoute)
v1_Router.use('/people/@me', infoRoute)
v1_Router.use('/provider/nex_token/@me', gameRoute)
v1_Router.use('/admin/mapped_ids', friendRoute)
v1_Router.use('/', miiRoute)
v1_Router.use('/provider/service_token/@me', tokenRoute)
v1_Router.use('/people/@me/devices/owner', owner_router);

module.exports = v1_Router;
