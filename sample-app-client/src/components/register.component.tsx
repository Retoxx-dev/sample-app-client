import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AuthService from "../services/auth.service";

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Register() {
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setErrorAlert(null);
  };

  useEffect(() => {
    if (successAlert) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(timer);
        navigate('/login');
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [successAlert, countdown]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const first_name = data.get('first_name');
    const last_name = data.get('last_name');

    AuthService.register(email as string, password as string, first_name as string, last_name as string).then(
      () => {
        setSuccessAlert("Registration successful, you will be redirected to the login page in: ");
      }).catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.detail === "REGISTER_USER_ALREADY_EXISTS") {
          setErrorAlert("User already exists");
        }
        else if (error.response && error.response.status === 422 && error.response.data.detail[0].loc[1] === "email") {
          setErrorAlert(error.response.data.detail[0].msg);
        }
        else if (error.response && error.response.status === 400 && error.response.data.detail.code === "REGISTER_INVALID_PASSWORD") {
          setErrorAlert(error.response.data.detail.reason);
        }
        else if (error.response && error.response.status === 400 && error.response.data.detail.code === "REGISTER_INVALID_NAME") {
          setErrorAlert(error.response.data.detail.reason);
        }
        else {
          setErrorAlert("Unknown error, check browser console for more details");
        }
    });
  };

  return (
    <div>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="first_name"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="last_name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
    {errorAlert !== null && (
        <Snackbar 
            open={errorAlert !== null} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
            <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
                {errorAlert}
            </Alert>
        </Snackbar>
    )}
    {successAlert !== null && (
        <Snackbar 
            open={successAlert !== null} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
            <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                {successAlert} {countdown}
            </Alert>
        </Snackbar>
    )}
  </div>
  );
}