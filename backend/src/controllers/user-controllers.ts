import { Response, Request, NextFunction } from "express";
const HttpError = require('../models/http-error');

const {validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getUsers= async(req: Request, res: Response, next: NextFunction)=>{

    let users:typeof User[]
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError("Fetching users failed, please try again later", 500);
        return next(error)
    }
    res.json({users:users.map(user=>user.toObject({getters:true}))})
};

const signup= async(req: Request, res: Response, next: NextFunction)=>{

    const errors = validationResult(req);
    const {name, email, password, imageUrl} = req.body;

    if(!errors.isEmpty()){
       return res.status(422).json({
        "Error": "Invalid inputs, please check your data"
        })
    }
    
    let existingUser: typeof User[]
    try {
        existingUser = await User.findOne({email:email});
    } catch (err) {
        return res.status(422).json({
            "Error": "Signup failed, please try again later"
        })
    } 

    if(existingUser){
        return res.status(422).json({
            "Error": "Could not create user, email already exist"
        })
    }

    try {

        bcrypt.hash(password, 10, async function (err:any, hash:string) {
            if (err) {
                return res.status(400).json({
                    "Error": err.message
                })
            } else {

                const user = new User({
                    name :name,
                    email : email,
                    image:!imageUrl?"https://cdn.onlinewebfonts.com/svg/img_569204.png":imageUrl,
                    password: hash
                });
                user.save().then(() => {
                    return res.status(200).json({
                        user:{
                        name :name,
                        email : email,
                        image:!imageUrl?"https://cdn.onlinewebfonts.com/svg/img_569204.png":imageUrl,
                        }
                        
                    })
                })
            }
        })
    } catch (err) {
         return res.status(500).json({
            "Error": "Signin up failed please try again later"
        })
    }

};

const login= async(req:Request, res: Response, next: NextFunction) =>{
    const {email } = req.body;
    
    let existingUser: typeof User
    try {
        existingUser = await User.findOne({email:email});
    } catch (err) {
        const error = new HttpError('Signup failed, please try again later', 500)
        return next(error);
    }

    if (!existingUser) {
        return res. status(400).json({message:"No User Exists With given Email / Phone Number"})
    } else {
        bcrypt.compare(req.body.password, existingUser.password, function (err:any, result:any) { 
            if (err) {
                return res.status(401).json({
                    message: err.message
                })
            }
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: existingUser._id
                });

                return res.status(200).json({
                   message:"LoggedIn Success",
                   "token":token
                })
            } else {
                return res.status(401).json({
                    message:"Invalid Credentials"
                })
            }

        })

    }
    
}

exports.getUsers= getUsers;
exports.signup= signup;
exports.login=login; 