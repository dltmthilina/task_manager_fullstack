import { Button, TextField } from "@mui/material"

const AddTask = () => {

    return <form className=" flex flex-row space-x-6 mt-2 mb-6 items-center ">
        <div className="w-4/5">
            <TextField
                    variant="outlined"
                    fullWidth
                    id="title"
                    label="New Task"
                    name="title"
                    autoFocus
                    className="mb-4"
            />
        </div>
        <div className="w-1/5">
        <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                   fullWidth
                >
                    Add Task
        </Button>
        </div>
            
        </form>
}

export default AddTask