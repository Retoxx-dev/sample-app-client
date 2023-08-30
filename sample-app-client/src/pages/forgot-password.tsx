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
import { useState } from 'react';

export default function ForgotPassword() {
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    setSuccessAlert(null);
    setErrorAlert(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    AuthService.forgotPassword(email as string).then(
        () => {
            setSuccessAlert("If the email exists in our database, you will receive an email with instructions to reset your password");
        }).catch((error) => {
            setErrorAlert("Unknown error, check browser console for more details");
        })
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
            Forgot Password
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
        {successAlert !== null && (
            <Snackbar 
                open={successAlert !== null} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                    {successAlert}
                </Alert>
            </Snackbar>
        )}
    </div>
  );
}