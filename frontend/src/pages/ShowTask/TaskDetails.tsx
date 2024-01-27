import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Chip } from '@mui/material';
import Tasks from "../../tasks.json"
import { useParams } from 'react-router-dom';
import { TaskModel } from '../../models/TaskModel';

const TaskDetails = () => {

    const {taskId} = useParams();
    const [task, setTask] = useState<TaskModel>();

    const selectTask = () => {
       return Tasks.taskes.find((t)=>t.id.toString() === taskId)
    }

    useEffect(()=>{
        const selectedTask = selectTask()
        //setTask(selectedTask[0])
        console.log(selectedTask);
    },[])

  return (
    <Paper className="p-6">
      <Typography variant="h5" gutterBottom>
        Task Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Title:</strong> {/* {task.title} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Description:</strong> {/* {task.description} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Created Date:</strong> {/* {task.createdDate} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Due Date:</strong> {/* {task.dueDate} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Last Updated Date:</strong> {/* {task.lastUpdatedDate} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Status:</strong> <Chip /* label={task.status} */ color="primary" />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskDetails;
