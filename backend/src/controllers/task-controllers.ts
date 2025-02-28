import { NextFunction, Request, Response } from "express";
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Task = require("../models/task");

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description, due_date, status, user_id, created_date } =
    req.body;

  const createdTask = new Task({
    title,
    description,
    due_date,
    created_date,
    status,
    creator: user_id,
  });

  try {
    await createdTask.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(new HttpError(error, 500));
  }
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task: createdTask,
  });
};

const getTasksByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.body;
  let tasks: (typeof Task)[];
  try {
    tasks = await Task.find({ creator: user_id });
  } catch (err) {
    return next(
      new HttpError("Fetching tasks failed, please try again later", 500)
    );
  }
  if (!tasks || tasks.length === 0) {
    return next(
      new HttpError("Could not find a tasks for the provided id", 404)
    );
  }
  res
    .status(200)
    .json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
};

const getTaskByTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const task_id = req.params.tid;
  const task: (typeof Task)[] = [];
  try {
    task.push(await Task.findOne({ _id: task_id }));
  } catch (err) {
    return next(
      new HttpError("Fetching tasks failed, please try again later", 500)
    );
  }
  if (!task || task.length === 0) {
    return next(
      new HttpError("Could not find a tasks for the provided id", 404)
    );
  }
  res.status(200).json({
    success: true,
    task: task.map((task) => task.toObject({ getters: true })),
  });
};

const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const taskId = req.params.tid;
  const { status } = req.body;

  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs, please check your data", 422));
  }

  let task: typeof Task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Fetching tasks failed, please try again later",
      500
    );
    return next(error);
  }

  task.status = status;
  try {
    await task.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({
    Message: "Task status updated successfully",
    task: task.toObject({ getters: true }),
  });
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const taskId = req.params.tid;

  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description, due_date, status } = req.body;

  let task: typeof Task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Fetching tasks failed, please try again later",
      500
    );
    return next(error);
  }

  task.title = title;
  task.description = description;
  task.due_date = due_date;
  task.status = status;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ message: "Task updated successfully", task: task });
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.tid;
  let task: typeof Task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    return next(
      new HttpError("Find tasks failed, please try again later", 404)
    );
  }
  if (!task) {
    return next(
      new HttpError("Could not find a tasks for the provided id", 404)
    );
  }
  try {
    await task.deleteOne();
  } catch (err: any) {
    return next(new HttpError(err.message, 500));
  }
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

exports.createTask = createTask;
exports.getTasksByUserId = getTasksByUserId;
exports.updateStatus = updateStatus;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.getTaskByTaskId = getTaskByTaskId;
