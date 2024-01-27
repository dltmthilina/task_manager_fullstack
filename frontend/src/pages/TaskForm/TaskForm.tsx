import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  
const navigate = useNavigate();

  return (
    <Layout>
    <Paper className="p-6">
      <div className='flex space-x-4'>
        <ArrowBackIcon  onClick={()=>navigate('/dashboard')} className='cursor-pointer'/>
        <Typography variant="h5" gutterBottom >
        { 'Edit Task'}
      </Typography>
      </div>
      <form className='space-y-4'>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={""}
          onChange={()=>{}}
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
          value={""}
          onChange={()=>{}}
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
            value={""}
            onChange={()=>{}}
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
              value={""}
              onChange={()=>{}}
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
