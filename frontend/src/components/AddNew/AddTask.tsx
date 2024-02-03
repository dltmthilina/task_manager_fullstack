import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { TaskService } from "../../services/TaskService"
import { TaskModel } from "../../models/TaskModel"

const AddTask = () => {

    const [task, setTask] = useState<TaskModel>({
        "id":"",
        "title":"",
        "description":"",
        "dueDate": new Date(),
        "status":""  
    })

    const submitHandler = async(e:any) => {
        e.preventDefault();
        console.log(task)
         await TaskService.createTask(task)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }

    return <form className=" flex flex-row space-x-6 mt-2 mb-6 items-center" onSubmit={submitHandler}>
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
                    onChange={e => setTask({...task, "title":e.target.value})}
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
}

export default AddTask