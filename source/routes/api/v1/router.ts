// Router for /api/v1

// types
import type { NextFunction, Request, Response } from "express"

// Routes
import eulaRoute from './eula.js'
import statusRoute from './status.js'
import timezoneRoute from './timezone.js'
import rnidRoute from './rnid.js'
import emailRoute from './email.js'
import peopleRoute from './people.js'
import serviceRoute from './oauth.js'
import infoRoute from './info.js'
import gameRoute from './game.js'
import friendRoute from './friends.js'
import miiRoute from './mii.js'
import tokenRoute from './service.js'

// Import express router
import { Router } from "express"
import { owner_router } from './login.js'
const v1_Router = Router(); 

// Middleware for setting content type
v1_Router.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/xml');
    next();
})

v1_Router.use('/content/agreements/Nintendo-Network-EULA/:var/@latest', eulaRoute)
v1_Router.use('/devices/@current/status', statusRoute)
v1_Router.use('/content/time_zones/:var/:var', timezoneRoute)
v1_Router.use('/people', rnidRoute)
v1_Router.use('/people/@me/devices/', rnidRoute)
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

export {v1_Router};