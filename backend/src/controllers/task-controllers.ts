import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error');
const Task = require('../models/task')

const createTask = async(req:Request, res: Response, next:NextFunction) => {
    if (!req.body || !req.body.title) {
        return res.status(400).json({ error: 'Missing title in request body' });
      }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next( new HttpError("Invalid inputs, please check your data", 422));
    }

    const { title, description, dueDate, status, creator} = req.body;

    const createdTask = new Task({
        title,
        description,
        dueDate,
        status,
        creator
    });

    try {
        await createdTask.save()
   } catch (err) {
        const error = new HttpError(err,500 );
       return next(error); 
   }
   res.status(201).json({task:createdTask});
}


exports.createTask = createTask; 