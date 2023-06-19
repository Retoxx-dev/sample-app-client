import React, { useState } from "react";
import authService from "../services/auth.service";

import { Box, Button, TextField, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Me() {
  const currentUser = authService.getCurrentLocalUser();
  const [email, setEmail] = useState(currentUser.email);
  const [first_name, setFirstName] = useState(currentUser.first_name);
  const [last_name, setLastName] = useState(currentUser.last_name);

  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    setSuccessAlert(null);
    setErrorAlert(null);
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        email: email,
        first_name: first_name,
        last_name: last_name,
      };

      await authService.updateCurrentUser(updatedUser).then(() => {
        setSuccessAlert("User details updated successfully");
      });

    } catch (error) {
      setErrorAlert("Error updating user details");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <div>
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Profile
          </Typography>
    
          <TextField
            label="ID"
            value={currentUser.id}
            disabled
            fullWidth
            sx={{ mb: 2 }}
          />
    
          <TextField
            label="Email"
            value={email}
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleEmailChange}
          />
    
          <TextField
            label="First Name"
            value={first_name}
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleFirstNameChange}
          />
    
          <TextField
            label="Last Name"
            value={last_name}
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleLastNameChange}
          />
    
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
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
