import { Button, Grid, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
        <Grid container component="main" className="w-full">

          {/* Image Section */}
          <Grid item xs={12} sm={6} className="mb-6 sm:mb-0">
            <img
              src="https://www.sapphiresolutions.net/images/task_management_app/images/task_app_banner.svg"
              alt="Login Image"
              className="w-full h-full object-cover md:object-contain"
            />
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} sm={6} component={Paper} square className="flex justify-center items-center md:h-screen">
            <div className="p-6 md:w-96 w-full">
              <Typography component="h1" variant="h5" className="mb-4">
                Login
              </Typography>
              
              <form noValidate className="flex flex-col space-y-4">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </Grid>

        </Grid>
      </div>
    </div>
  );
};

export default LoginPage;
