import {Router} from "express";

import v1_Router from "./api/v1/router";
import endpointRoute from "./api/v1/endpoint";
import {jwtSecret} from "../config.json";

export const ApiRouter = Router();

ApiRouter.use("/api", v1_Router);
ApiRouter.use("/endpoint", endpointRoute);