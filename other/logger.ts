import colors from 'colors';
import moment from 'moment';
import { NextFunction, Request, Response } from 'express';


// unused import migth be deleted
import config from '../config.json';

export function Get(input: string) {
    return `(${moment().format("HH:mm:ss")}) [GET] ${input}`.green
}

export function Info(input: string) {
    return `(${moment().format("HH:mm:ss")}) [INFO] ${input}`.green
}

export function Postgresql(input: string) {
    return `(${moment().format("HH:mm:ss")}) [Postgresql] ${input}`.blue
}

export function Error(input: string) {
    return `(${moment().format("HH:mm:ss")}) [ERROR] ${input}`.red
}

export function Put(input: string) {
    return `(${moment().format("HH:mm:ss")}) [PUT] ${input}`.magenta
}

export function Delete(input: string) {
    return `(${moment().format("HH:mm:ss")}) [DELETE] ${input}`.white
}

export function Post(input: string) {
    return `(${moment().format("HH:mm:ss")}) [POST] ${input}`.yellow
}
const Methods = {
    "GET": Get,
    "POST": Post,
    "PUT": Put,
    "DELETE": Delete,
    "INFO": Info
}
export function Middleware(req: Request, res: Response, next: NextFunction){
    if(!req.method)
        return next();
    const Method = Methods[req.method] ?? Methods["INFO"];
    console.log(Method(req.originalUrl));
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
	next();
}