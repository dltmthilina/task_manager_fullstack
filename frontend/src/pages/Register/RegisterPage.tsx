// RegistrationForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { userValidationSchema } from '../../common/validatios';
import { UserFormModel } from '../../models/UserModel';
interface FormData {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
}

const RegisterPage: React.FC = () => {

    const [initialData, setInitialData] = useState<UserFormModel>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageUrl: "",
    });

    const formik =  useFormik({
        initialValues: initialData,
        validationSchema:userValidationSchema,
        onSubmit:(values)=>{
          console.log(values);
        }
    });



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
        
        <form className="flex flex-col space-y-4" onSubmit={formik.handleSubmit }>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name? true:false}
          helperText={formik.errors.name}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email? true:false}
          helperText={formik.errors.email}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password? true:false}
          helperText={formik.errors.password}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword? true:false}
          helperText={formik.errors.confirmPassword}
        />

        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imageUrl && formik.errors.imageUrl? true:false}
          helperText={formik.errors.imageUrl}
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
