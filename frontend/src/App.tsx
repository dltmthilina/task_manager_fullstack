import React from 'react';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path:'/',
    element:<LoginPage/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
