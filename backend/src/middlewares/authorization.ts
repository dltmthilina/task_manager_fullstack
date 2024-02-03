import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const secret = "taskmanager"

const Authentication = (req: Request, res: Response, next: NextFunction)=>{                    //Authenticate user and 
    if (req.headers.authorization) {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, secret, function (err: any, decoded: any) {
                if (err) {
                    return res.status(400).json({
                        message: "Not a Valid Token"
                    })
                }
                console.log(decoded)
                req.body.user_id = decoded.data;
                next()
            })
        } else {
            return res.status(401).json({
                message: "Token Missing"
            })
        }

    } else {
        return res.status(403).json({
            message: "Not Authenticated User"
        })
    }
}

module.exports = Authentication;
