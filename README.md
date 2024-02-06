# Task Manager App

Task Manager App is a full-stack application built with the MERN stack. It allows users to create, delete, display, and update tasks. Users can register, log in, and manage their tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)


## Features

- User Registration and Login with json web token
- Task Creation, Deletion, and Update
- Displaying Tasks for Logged-in Users
- Type-Safe React App using TypeScript
- Styling with Tailwind CSS and Material-UI
- Form Data Management with Formik
- Password Hashing with bcrypt

## Technologies Used

- Frontend:
  - ReactJS with TypeScript
  - Tailwind CSS
  - Material-UI
  - Formik

- Backend:
  - Node.js with Express.js
  - Axios for API Requests
  - bcrypt for Password Hashing
  - MongoDB

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository
2. Open the project folder with VS CODE
3. Open a terminal in the VS CODE
4. Set up the frontend. Follw following command in terminal

   cd frontend

   npm install
5. create .env file at the root root directory in the frontend and save with following string

    REACT_APP_BACKEND_BASE_URL=http://localhost:5000

6. Run the project
7. Then react frontend will run on http://localhost:3000
8. Open your browser and see http://localhost:3000
9. Create an accound in MongoDB Atlas https://cloud.mongodb.com
10. Setup your cluster and create user with user name and password to access the database. User should have privileges to read and write
11. Whitelist your current IP of your PC to give permission to access the database.It can do in the Network Access tab in your mongoDB atlas
12. You need to copy database connection string from your mongodb account like following.

MONGODB_API=`mongodb+srv://<username>:<password>@cluster5.5ewikdlvg.mongodb.net/<database_name>?retryWrites=true&w=majority`


13. Now replace username, password with your database user's username and password. database_name can replace with any name you like.

14. Open the new terminal run following commands

    cd backend

    npm install

15. Now create .env file and copy and paste above string mentioned in point 12 after doing point 13.

16. Run, npm run dev in the terminal

17. Now you can use the APP

