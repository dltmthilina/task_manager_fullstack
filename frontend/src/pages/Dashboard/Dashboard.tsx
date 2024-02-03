import { Grid, Typography } from "@mui/material"
import Layout from "../../components/Layout/Layout"
import TaskTable from "../../components/TaskTable/TaskTable"
import { AddTask } from "@mui/icons-material"
import { useEffect } from "react"
import { TaskService } from "../../services/TaskService"
import { useParams } from "react-router-dom"

const Dashboard = () => {

    const {uid} = useParams();

    const fetchAllTasks = async() =>{
        try {
           const tasks = await TaskService.getTaskByUserId()
           console.log(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAllTasks()
    },[]);

    return<Layout>
        <Grid container className=" flex flex-col md:flex md:flex-row ">
            <Grid item xs={3} >
                <div className="flex flex-col md:h-full md:space-y-6 justify-evenly items-center">
                <div className=" flex flex-col items-center space-y-4">
                    <img className="rounded-full" style={{width:'10rem', height:'10rem'}} src="https://www.giantfreakinrobot.com/wp-content/uploads/2021/12/scoob-900x506.jpeg" alt="pro_pic"/>
                    <div>
                        <div className="flex space-x-4">
                            <Typography>Name : </Typography>
                            <Typography>Thilina</Typography>
                        </div>
                        <div className="flex space-x-4">
                            <Typography>Email :</Typography>
                            <Typography>thilina@gmail.com</Typography>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-8 ">
                    <div className=" flex space-x-6 items-center rounded-full bg-blue-400 p-4">
                        <Typography variant="h4">{`10`}</Typography>
                        <Typography variant="h6">Total tasks</Typography>
                    </div>
                    <div className=" flex space-x-6 items-center rounded-full bg-red-400 p-4">
                        <Typography variant="h4">{`10`}</Typography>
                        <Typography variant="h6">Pending tasks</Typography>
                    </div>
                    <div className=" flex space-x-6 items-center rounded-full bg-green-400 p-4">
                        <Typography variant="h4">{`10`}</Typography>
                        <Typography variant="h6">Completed</Typography>
                    </div>
                </div>
                </div>
            </Grid>
            <Grid item xs={9} className="p-2">
                <TaskTable/>
            </Grid>
        </Grid>
    </Layout>
}

export default Dashboard