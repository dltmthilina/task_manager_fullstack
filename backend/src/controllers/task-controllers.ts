import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error');
const Task = require('../models/task')

const createTask = async(req:Request, res: Response, next:NextFunction) => {
    
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
        await createdTask.save();
   } catch (err) {
        const error = new HttpError(err,500 );
       return next(error); 
   }
   res.status(201).json({task:createdTask});
}

const getTasksByUserId = async(req:Request, res: Response, next:NextFunction) => {

    const userId = req.params.uid;
    let tasks: typeof Task[];
    try {
        tasks = await Task.find({creator : userId});
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later', 500);
        return next(error);
    }
    if(!tasks || tasks.length === 0){
        const error =  new HttpError('Could not find a tasks for the provided id.', 404); 
        return next(error);
    }
    res.json({tasks: tasks.map(task=>task.toObject({getters:true}))});
}

const updateStatus = async(req:Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);
    const taskId = req.params.tid;
    const { status } = req.body;
    
    if(!errors.isEmpty()){
        next( new HttpError("Invalid inputs, please check your data", 422));
    }

    let task: typeof Task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later', 500);
        return next(error);
    }

   task.status = status;
    try {
        await task.save();
   } catch (err) {
        const error = new HttpError(err,500 );
       return next(error); 
   }
   res.status(200).json({task:task.toObject({getters:true})})
}


exports.createTask = createTask; 
exports.getTasksByUserId = getTasksByUserId;
exports.updateStatus = updateStatus;