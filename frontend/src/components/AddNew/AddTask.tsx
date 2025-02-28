import { Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskService } from "../../services/TaskService";
import { TaskModel } from "../../models/TaskModel";
import { useNotifi } from "../../context/NotifiContext";

interface AddProps {
  setIsCreating: Dispatch<SetStateAction<boolean>>;
}

const AddTask = ({ setIsCreating }: AddProps) => {
  const [task, setTask] = useState<TaskModel>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    createdDate: new Date(),
    status: "Pending",
  });

  const { showNotification } = useNotifi();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setIsCreating(true);
    console.log(task);
    await TaskService.createTask(TaskModel.convertToJson(task))
      .then((res) => {
        setIsCreating(false);
        console.log(res);
        if (res?.status === 201) {
          showNotification({
            message: res.data.message,
            code: res.status,
            type: "success",
            isShow: true,
          });
        } else {
          showNotification({
            message: res.data.message,
            code: res.status,
            type: "error",
            isShow: true,
          });
        }
      })
      .catch((err) => {
        setIsCreating(false);
        console.log(err);
      });
  };

  return (
    <form
      className=" flex flex-row space-x-6 mt-2 mb-6 items-center"
      onSubmit={submitHandler}
    >
      <div className="w-4/5">
        <TextField
          variant="outlined"
          fullWidth
          required
          id="title"
          label="New Task"
          name="title"
          autoFocus
          className="mb-4"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div className="w-1/5">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onChange={submitHandler}
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default AddTask;
