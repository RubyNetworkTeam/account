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
const v1_Router = Router(); 

app.use('/content/agreements/Nintendo-Network-EULA/:var/@latest', eulaRoute)
app.use('/devices/@current/status', statusRoute)
app.use('/content/time_zones/:var/:var', timezoneRoute)
app.use('/people', rnidRoute)
app.use('/people/@me/devices/owner', rnidRoute)
app.use('/support/validate/email', emailRoute)
app.use('/admin/time', emailRoute)
app.use('/people/', peopleRoute)
app.use('/oauth20/access_token/generate', serviceRoute)
app.use('/people/@me/profile', infoRoute)
app.use('/people/@me', infoRoute)
app.use('/provider/nex_token/@me', gameRoute)
app.use('/admin/mapped_ids', friendRoute)
app.use('/people/@me/miis/@primary', miiRoute)
app.use('/provider/service_token/@me', tokenRoute)

module.exports = v1_Router;