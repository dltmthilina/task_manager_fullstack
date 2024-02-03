import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error');
const Task = require('../models/task')

const createTask = async(req:Request, res: Response, next:NextFunction) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next( new HttpError("Invalid inputs, please check your data", 422));
    }

    const { title, description, due_date, status, user_id} = req.body;

    const createdTask = new Task({
        title,
        description,
        due_date,
        status,
        creator:user_id
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

    const { user_id } = req.body;
    let tasks: typeof Task[];
    try {
        tasks = await Task.find({creator : user_id});
    } catch (err) {
        return res.status(500).json({
            message: 'Fetching tasks failed, please try again later'
        })
    }
    if(!tasks || tasks.length === 0){
        return res.status(404).json({
            message: 'Could not find a tasks for the provided id.'
        })
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

const updateTask = async(req:Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);
    const taskId = req.params.tid;

    if(!errors.isEmpty()){
        next( new HttpError("Invalid inputs, please check your data", 422));
    }
    
    const { title, description, dueDate, status, creator} = req.body;

    let task: typeof Task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later', 500);
        return next(error);
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    task.creator = creator;

    try {
        await task.save();
   } catch (err) {
        const error = new HttpError(err,500 );
       return next(error); 
   }
   res.status(201).json({task:task});

}

const deleteTask = async(req:Request, res: Response, next:NextFunction) => {
    const taskId = req.params.tid;
    let task: typeof Task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later', 500);
        return next(error);
    }
    if(!task ){
        const error =  new HttpError('Could not find a tasks for the provided id.', 404); 
        return next(error);
    }
   try{
        await task.deleteOne();
    } catch (err) {
        const error= new HttpError('Something went wrong', 500);
        return next(error)
    }
    res.status(200).json({message:'Deleted task'})
}


exports.createTask = createTask; 
exports.getTasksByUserId = getTasksByUserId;
exports.updateStatus = updateStatus;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;