import { NextFunction, Request, Response } from "express";
import { errorStatus } from "../models/Status";
import { DatabaseHandler } from "./Database";

export function authMiddleware(req: Request, res: Response ,next: NextFunction){

    var key = DatabaseHandler.getDbInstance().get("key");

    if(key == req.cookies["Auth"]){
        next();
    }else{
        res.json(errorStatus);
    }
}