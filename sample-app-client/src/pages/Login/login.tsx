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

import AuthService from "../../services/auth.service";
import userService from '../../services/user.service';
// import MfaService from '../../services/mfa.service';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

export interface ILoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignIn(props:ILoginProps) {
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // const [mfaStatus, setMfaStatus] = useState<boolean | null>(false);

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setErrorAlert(null);
  };

  useEffect(() => {
    const authenticated = AuthService.isAuthenticated();
    if (authenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    // const otpCode = data.get('mfa');

    AuthService.login(email as string, password as string).then(
      () => {
        userService.saveCurrentUser().then(
          () => {
            console.log("User saved successfully");
            window.location.href = "/";
            props.setIsAuthenticated(true);
          }
        )
        // if (response && response.access_token) {
        //   MfaService.checkMfaLoginStatus(response.access_token).then((response) => {
        //     if(response.data.otp_enabled && response.data.otp_verified === true) {
        //       setMfaStatus(true);
        //       console.log("MFA is enabled");
        //     }
        //     else {
        //       console.log("MFA is not enabled");
        //     }
        //   })
        // }
        // if (response && response.access_token && otpCode != null) {
        //   const otpObject = {
        //     "token": otpCode as string
        //   }
        //   const authToken = response.access_token;
        //   const tokenObject = {
        //     "access_token": authToken,
        //     "token_type" :"bearer"
        //   }
        //   MfaService.validateOtp(response.access_token, otpObject).then((response) => {
        //     if(response.data.otp_valid === true) {
        //       localStorage.setItem('user', JSON.stringify(tokenObject));
        //       userService.saveCurrentUser2(authToken)
        //       props.setIsAuthenticated(true);
        //       window.location.href = "/";
        //     }
        //   })
        // }
      }).catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.detail === "LOGIN_BAD_CREDENTIALS") {
          setErrorAlert("Invalid Username or Password");
        }
        else {
          setErrorAlert("An error occurred while trying to login");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* {mfaStatus ?(
            <TextField
              margin="normal"
              required
              fullWidth
              name="mfa"
              label="MFA Code"
              id="mfa"
            />) : null} */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Let's register
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
    </div>
  );
}