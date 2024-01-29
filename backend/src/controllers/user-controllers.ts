import { Response, Request, NextFunction } from "express";

const {validationResult} = require('express-validator');
const User = require('../models/user');

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
    if(!errors.isEmpty()){
       return next(new HttpError("Invalid inputs, please check your data", 422))
    }
    const {name, email, password} = req.body;

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

    const createdUser = new User({
        name,
        email,
        image: "https://media-exp1.licdn.com/dms/image/C5603AQF3g4a3m3_dVw/profile-displayphoto-shrink_200_200/0/1651069085398?e=1675296000&v=beta&t=jNtCxSaRWnhc4vRs6HpACKnFkNNjUqe-eyjPD50qOd0",
        password,
        places:[]
    })

    try {
        await createdUser.save();
    } catch (err) {
         const error = new HttpError('Signin up failed, please try again later', 500)
        return next(error) 
    }
    
    res.status(201).json({user:createdUser.toObject({getters:true})})
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