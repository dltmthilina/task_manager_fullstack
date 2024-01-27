import React from 'react';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TaskForm from './pages/TaskForm/TaskForm';
import TaskDetails from './pages/ShowTask/TaskDetails';

const router = createBrowserRouter([
  {
    path:'/',
    element:<LoginPage/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/edit-task/:taskId',
    element:<TaskForm/>
  },
  {
    path:'/task/:taskId',
    element:<TaskDetails/>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
