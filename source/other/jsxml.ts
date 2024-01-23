import type { NextFunction, Request, Response } from "express";
import type {XmlElement, XmlOptions } from "jstoxml";

import jstoxml from 'jstoxml';
const toXML = jstoxml.toXML;


export function XMLMiddelware(_: Request, res: Response, next: NextFunction){
    res.xml = (Content: XmlElement | XmlElement[], options?: XmlOptions) => {
        res.setHeader('Content-Type', 'application/xml');
        res.send(toXML(Content, options));
    }    
    next();
}