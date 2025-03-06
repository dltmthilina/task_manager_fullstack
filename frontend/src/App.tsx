import React from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskForm from "./pages/TaskForm/TaskForm";
import TaskDetails from "./pages/ShowTask/TaskDetails";
import RegisterPage from "./pages/Register/RegisterPage";
import { useNotifi } from "./context/NotifiContext";
import UserAlert from "./components/Alert/UserAlert";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/edit-task/:taskId",
    element: <TaskForm />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetails />,
  },
]);

function App() {
  const { notification } = useNotifi();
  return (
    <>
      {notification.isShow && <UserAlert />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
