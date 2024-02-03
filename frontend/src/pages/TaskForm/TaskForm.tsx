import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskService } from '../../services/TaskService';
import { TaskModel } from '../../models/TaskModel';
import { useFormik } from 'formik';

const TaskForm = () => {
  
  const {taskId} = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskModel>({
    id:"",
    title:"",
    description:"",
    dueDate: "",
    createdDate: new Date(),
    status:"",
  });

  const formik = useFormik({
    initialValues: task,
    onSubmit:async(values)=>{
      console.log(values)
       await TaskService.updateTask(taskId!, TaskModel.convertToJson(values))
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err)
        }) 
    }
  });

  const fetchTask = async(taskId:string) => {
    await TaskService.getTaskByTaskId(taskId)
        .then((res)=>{
            console.log(res)
            setTask(res!)
            formik.setValues(res!);
        }).catch((err)=>{
            console.log(err)
        })
  }

  useEffect(()=>{
    if(taskId){
      fetchTask(taskId);
    }
  },[]);

  return (
    <Layout>
    <Paper className="p-6">
      <div className='flex space-x-4'>
        <ArrowBackIcon  onClick={()=>navigate('/dashboard')} className='cursor-pointer'/>
        <Typography variant="h5" gutterBottom >
        { 'Edit Task'}
      </Typography>
      </div>
      <form className='space-y-4' onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoFocus
          className="mb-4"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          id="description"
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mb-4"
        />
        <div className='flex items-center space-x-4'>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dueDate"
            label="Due Date"
            type="date"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              required
              id="status"
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {'Save'}
        </Button>
      </form>
    </Paper>
  </Layout>
  );
};

export default TaskForm;
