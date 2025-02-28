// src/index.js
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const taskRoutes = require("./routes/task-routes");
const userRoutes = require("./routes/user-routes");
const cors = require("cors");
const Auth = require("./middlewares/authorization");

dotenv.config();

interface CustomError extends Error {
  code?: number; // Optional property for error code
}

const app: Express = express();
const port = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_API || "";

app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/tasks", Auth, taskRoutes);
app.use("/api/users", userRoutes);
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 400);
    res.json({ message: error.message || "An unknown error occured!" });
  }
);

mongoose
  .connect(mongodb_url)
  .then(() => {
    console.log("connected to the database");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
