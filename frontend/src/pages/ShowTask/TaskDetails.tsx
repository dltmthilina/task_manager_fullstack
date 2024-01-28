import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Chip } from '@mui/material';
import Tasks from "../../tasks.json"
import { useParams } from 'react-router-dom';
import { TaskModel } from '../../models/TaskModel';
import Layout from '../../components/Layout/Layout';

const TaskDetails = () => {

    const {taskId} = useParams();
    const [task, setTask] = useState<TaskModel>();

    const selectTask = () => {
      const data = Tasks.taskes.find((t)=>t.id.toString() === taskId)
       return  TaskModel.fromJsonData(data) 
    }

    useEffect(()=>{
        const selectedTask = selectTask()
        setTask(selectedTask)
        console.log(selectedTask);
    },[])

  return (<Layout>
    <Paper className="p-6">
      <Typography variant="h5" gutterBottom>
        Task Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Title:</strong> {task?.title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Description:</strong> {task?.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Created Date:</strong>{`${task?.dueDate}`}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Due Date:</strong> {`${task?.dueDate}`}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Last Updated Date:</strong> {`${task?.updatedDate}`}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            <strong>Status:</strong> <Chip  label={task?.status} color="primary" />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
    </Layout>
  );
};

export default TaskDetails;
