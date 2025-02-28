import { Response, Request, NextFunction } from "express";
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "taskmanager";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { name, email, password, imageUrl } = req.body;

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  let existingUser: (typeof User)[];
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signup failed, please try again later", 422));
  }

  if (existingUser) {
    return next(
      new HttpError("Could not create user, email already exist", 422)
    );
  }

  try {
    bcrypt.hash(password, 10, async function (err: any, hash: string) {
      if (err) {
        return next(new HttpError(err.message, 400));
      } else {
        const user = new User({
          name: name,
          email: email,
          image: !imageUrl
            ? "https://cdn.onlinewebfonts.com/svg/img_569204.png"
            : imageUrl,
          password: hash,
        });
        user.save().then(() => {
          return res.status(201).json({
            success: true,
            message: "Registered user successfully",
            user: {
              name: name,
              email: email,
              image: !imageUrl
                ? "https://cdn.onlinewebfonts.com/svg/img_569204.png"
                : imageUrl,
            },
          });
        });
      }
    });
  } catch (err) {
    return next(new HttpError("Signin up failed please try again later", 500));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  let existingUser: typeof User;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signup failed, please try again later", 500));
  }

  if (!existingUser) {
    return next(new HttpError("No User Exists With given Email", 400));
  } else {
    bcrypt.compare(
      req.body.password,
      existingUser.password,
      function (err: any, result: any) {
        if (err) {
          return next(new HttpError(err.message, 401));
        }
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: existingUser._id,
            },
            secret
          );

          return res.status(200).json({
            success: true,
            message: "LoggedIn Success",
            user: {
              email: existingUser.email,
              name: existingUser.name,
            },
            token: token,
          });
        } else {
          return next(new HttpError("Invalid Credentials", 401));
        }
      }
    );
  }
};

exports.signup = signup;
exports.login = login;
