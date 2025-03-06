import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import TaskTable from "../../components/TaskTable/TaskTable";
import { useEffect, useState } from "react";
import { TaskService } from "../../services/TaskService";
import AddTask from "../../components/AddNew/AddTask";
import { TaskModel } from "../../models/TaskModel";
import { useNotifi } from "../../context/NotifiContext";

enum Status {
  PENDING = "Pending",
  COMPLETED = "Completed",
  INPROGRESS = "In_progress",
}

const Dashboard = () => {
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    email: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [renderedTasks, setRenderedTasks] = useState<TaskModel[]>([]);
  const [count, setCount] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    inProgress: 0,
  });
  const { showNotification } = useNotifi();

  const filterPendingTasks = () => {
    const ftasks = tasks?.filter((t) => t.status === Status.PENDING);
    setCount((preCount) => ({
      ...preCount,
      pending: ftasks ? ftasks.length : 0,
    }));
    return ftasks;
  };

  const setRenderAllTasks = () => {
    setRenderedTasks(tasks);
  };

  const filterInProgressTasks = () => {
    const ftasks = tasks?.filter((t) => t.status === Status.INPROGRESS);
    setCount((preCount) => ({
      ...preCount,
      inProgress: ftasks ? ftasks.length : 0,
    }));
    return ftasks;
  };

  const filterCompletedTasks = () => {
    const ftasks = tasks?.filter((t) => t.status === Status.COMPLETED);
    setCount((preCount) => ({
      ...preCount,
      completed: ftasks ? ftasks.length : 0,
    }));
    return ftasks;
  };

  const fetchAllTasks = async () => {
    try {
      const res = await TaskService.getTaskByUserId();
      console.log(res);
      if (res?.status === 200) {
        setCount((pre) => ({
          ...pre,
          total: res ? res.data.tasks.length : 0,
        }));
        setTasks(res.data.tasks);
        setRenderedTasks(res.data.tasks);
      } else {
        showNotification({
          message: res?.data.message,
          code: res?.status,
          type: "error",
          isShow: true,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error,
        code: 500,
        type: "error",
        isShow: true,
      });
    }
  };

  useEffect(() => {
    const fetchedLoggedUser = async () => {
      const user = await localStorage.getItem("user");
      const retrievedUser = user ? JSON.parse(user) : null;
      setLoggedUser(retrievedUser);
      console.log(retrievedUser);
    };
    fetchedLoggedUser();
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [isProcessing]);

  useEffect(() => {
    if (tasks.length > 0) {
      filterCompletedTasks();
      filterInProgressTasks();
      filterPendingTasks();
    }
  }, [tasks]);

  return (
    <Layout>
      <Grid container className=" flex flex-col md:flex md:flex-row ">
        <Grid item xs={3}>
          <div className="flex flex-col md:h-full md:space-y-6 justify-evenly items-center">
            <div className=" flex flex-col items-center space-y-4">
              <img
                className="rounded-full"
                style={{ width: "10rem", height: "10rem" }}
                src="https://www.giantfreakinrobot.com/wp-content/uploads/2021/12/scoob-900x506.jpeg"
                alt="pro_pic"
              />
              <div>
                <div className="flex space-x-4">
                  <Typography>Name : </Typography>
                  <Typography>{loggedUser?.name}</Typography>
                </div>
                <div className="flex space-x-4">
                  <Typography>Email :</Typography>
                  <Typography>{loggedUser?.email}</Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 ">
              <div className=" flex space-x-4 items-center rounded-full bg-blue-400 py-2 px-4">
                <Typography variant="h4">{count.total}</Typography>
                <Button onClick={setRenderAllTasks}>Total tasks</Button>
              </div>
              <div className=" flex space-x-4 items-center rounded-full bg-red-400 py-2 px-4">
                <Typography variant="h4">{count.pending}</Typography>
                <Button onClick={() => setRenderedTasks(filterPendingTasks())}>
                  Pending tasks
                </Button>
              </div>
              <div className=" flex space-x-4 items-center rounded-full bg-yellow-400 py-2 px-4">
                <Typography variant="h4">{count.inProgress}</Typography>
                <Button
                  onClick={() => setRenderedTasks(filterInProgressTasks())}
                >
                  In Progress
                </Button>
              </div>
              <div className=" flex space-x-4 items-center rounded-full bg-green-400 py-2 px-4">
                <Typography variant="h4">{count.completed}</Typography>
                <Button
                  onClick={() => setRenderedTasks(filterCompletedTasks())}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className="p-2">
          <AddTask setIsCreating={setIsProcessing} />
          <TaskTable
            tasks={renderedTasks}
            isDeleting={isProcessing}
            setIsDeleting={setIsProcessing}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
