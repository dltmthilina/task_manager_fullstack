import { Button, Grid, Paper, Stack, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"

const LoginPage = () => {
    
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Grid container component="main">

        <Grid item xs={false} sm={6} className="hidden sm:block">
          <img
            src="https://via.placeholder.com/300"
            alt="Login Image"
            className="w-full h-full object-cover"
          />
        </Grid>

        <Grid item xs={12} sm={6} component={Paper} elevation={6} square className="flex justify-center items-center">
          <div className="p-10 w-1/2 flex flex-col">
            <Typography component="h1" variant="h5" className="mb-4">
              Login
            </Typography>
        
            <form noValidate>
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
                className="mb-4"
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
                className="mb-4"
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
)
}

export default LoginPage