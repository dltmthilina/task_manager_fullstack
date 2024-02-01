import { Response, Request, NextFunction } from "express";

const {validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');


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
       return next(new HttpError("Invalid inputs, please check your data", 422))
    }
    
    let existingUser
    try {
        existingUser = await User.findOne({email:email});
    } catch (err) {
        const error = new HttpError('Signup failed, please try again later', 500)
        return next(error);
    } 

    if(existingUser){
        const error =  new HttpError("Could not create user, email already exist", 422);
        return next(error)
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
                        "user": user
                    })
                })
            }
        })
    } catch (err) {
         const error = new HttpError('Signin up failed, please try again later', 500)
        return next(error) 
    }

};

const login= async(req:Request, res: Response, next: NextFunction) =>{
    const {email, password} = req.body;
    
    let existingUser
    try {
        existingUser = await User.findOne({email:email});
    } catch (err) {
        const error = new HttpError('Signup failed, please try again later', 500)
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in', 401)
        return next(error)
    }
    
    res.json({message:"Logged in!", user: existingUser.toObject({getters:true})});
}

exports.getUsers= getUsers;
exports.signup= signup;
exports.login=login; 