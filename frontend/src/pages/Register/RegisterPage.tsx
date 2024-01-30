// RegistrationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

interface FormData {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
}

const RegisterPage: React.FC = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Grid container component="main">

        <Grid item xs={12} sm={6} className="mb-6 sm:mb-0">
            <img
              src="https://www.sapphiresolutions.net/images/task_management_app/images/task_app_banner.svg"
              alt="Login Image"
              className="w-full h-full object-cover md:object-contain"
            />
        </Grid>

        <Grid item xs={12} sm={6} component={Paper}  square className="flex justify-center items-center md:h-screen">
          <div className="p-6 md:w-96 w-full">
            <Typography component="h1" variant="h5" className="mb-4">
              Register
            </Typography>
        
        <form className="flex flex-col space-y-4">

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={""}
          onChange={()=>{}}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={""}
          onChange={()=>{}}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          value={""}
          onChange={()=>{} }
        />

        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="imageUrl"
          value={""}
          onChange={()=>{}}
        />

        
        <Button variant="contained" color="primary" fullWidth type="submit">
          Register
        </Button>
      </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPage;
