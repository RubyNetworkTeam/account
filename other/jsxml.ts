import type { NextFunction, Request, Response } from "express";
import { toXML, type XmlElement, type XmlOptions } from "jstoxml";


export function XMLMiddelware(req: Request, res: Response, next: NextFunction){
    res.xml = (Content: XmlElement | XmlElement[], options?: XmlOptions) => {
        res.setHeader('Content-Type', 'application/xml');
        res.send(toXML(Content, options));
    }    
    next();
}