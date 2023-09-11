import React, { useEffect } from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button, Box, Typography } from '@mui/material';

import userService from "../services/user.service";

const UsersEditDialog = ({email, setEmail, firstName, setFirstName, lastName, setLastName, editedUser, openModal, handleCloseModal, setUsers, setSuccessAlert, setErrorAlert} : 
    {email: any, setEmail: any, firstName: any, setFirstName: any, lastName: any, setLastName: any, editedUser: any, openModal: any, handleCloseModal: any, setUsers: any, setSuccessAlert: any, setErrorAlert: any}
    ) => {
        
    useEffect(() => {
        if (editedUser) {
          setEmail(editedUser.email);
          setFirstName(editedUser.first_name);
          setLastName(editedUser.last_name);
        }
      }, [editedUser]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
    
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const updatedUser = {
          email: email,
          first_name: firstName,
          last_name: lastName,
        };
    
        userService.updateUser(editedUser?.id as string, updatedUser).then(
          () => {
          userService.getAllUsers()
            .then(response => {
              setUsers(response);
            })})
            .catch(error => {
              console.error('Error fetching users:', error);
              setErrorAlert("Error fetching users")
            });
        setSuccessAlert("User details updated successfully");
        handleCloseModal();
      };
    
    return (
        <>
           <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogContent>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Profile
                    </Typography>
                    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>    
                        <TextField
                        label="Email"
                        value={email}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleEmailChange}
                        />
                
                        <TextField
                        label="First Name"
                        value={firstName}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleFirstNameChange}
                        />
                
                        <TextField
                        label="Last Name"
                        value={lastName}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleLastNameChange}
                        />
                    </Box>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit" color="primary" onClick={handleFormSubmit}>
                        Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default UsersEditDialog;
