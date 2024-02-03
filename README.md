# Task Manager App

Task Manager App is a full-stack application built with the MERN stack. It allows users to create, delete, display, and update tasks. Users can register, log in, and manage their tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)


## Features

- User Registration and Login
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
  - MongoDB (assuming, as MERN usually implies MongoDB)

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository
2. Open the project folder with VS CODE
3. Open a terminal in the VS CODE
3. Set up the frontend

   cd frontend
   npm install
4. create .env file at the root root directory in the frontend and save with following string

    REACT_APP_BACKEND_BASE_URL=http://localhost:5000
5. Run the project
6. Then react frontend will run on http://localhost:3000
7. Open your browser and see http://localhost:3000
8. Create an accound in MongoDB Atlas https://cloud.mongodb.com
9. Setup your cluster and create user with user name and password to access the database
10. Whitelist current IP of your PC to give permission to access the database.It can do in the Network Access tab
11. You need to copy database connection string like following.

MONGODB_API='mongodb+srv://<username>:<password>@cluster5.5ewikdlvg.mongodb.net/<database_name>?retryWrites=true&w=majority'

12. Now replace username, passeword with your database user's username and password. database_name can replace with any name you like.
13. Open the new terminal run following commands
    cd frontend
    npm install
14. Now create .env file and copy and paste above string mentioned in poin 11 after doing point 12.
15. Run, npm dev run in the terminal
16. Now you can use the APP

