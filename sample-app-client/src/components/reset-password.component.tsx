import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/auth.service';

export default function ResetPassword() {
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSuccessAlert(null);
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

  const passwordsMatch = (password: string, confirmpassword: string) => {
    console.log(password);
    console.log(confirmpassword);
    if (password !== confirmpassword) {
        return false;
    }
    return true;
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmpassword = data.get('confirmpassword');
    const token = searchParams.get('token');

    if (passwordsMatch(password as string, confirmpassword as string)) {
            authService.resetPassword(token as string, password as string).then(
                () => {
                    setSuccessAlert("Password reset successfully, you will be redirected to the login page in: ");
                }
            ).catch((error) => {
                if (error.response && error.response.status === 400 && error.response.data.detail === "RESET_PASSWORD_BAD_TOKEN") {
                    setErrorAlert("Invalid or Expired Token");
                }
                else {
                    setErrorAlert("An error occurred while trying to reset password");
                }
            }
        )
    };
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmpassword"
              label="Confirm Password"
              name="confirmpassword"
              autoComplete="confirmpassword"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
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