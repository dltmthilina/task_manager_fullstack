// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bodyParser from "body-parser";

const taskRoutes = require('./routes/task-routes'); 
const userRoutes = require('./routes/user-routes');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_API || "";

app.use(express.json());
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);



mongoose
  .connect(mongodb_url)
  .then(() => {
    console.log("connected to the database");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });