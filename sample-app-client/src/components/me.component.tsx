import { Button, TextField, Typography } from "@mui/material";

import authService from "../services/auth.service";

const Me = ({currentUser, email, first_name, last_name, setEmail, setFirstName, setLastName, setSuccessAlert, setErrorAlert} : {currentUser: any, email: string, first_name: any, last_name: any, setEmail: any, setFirstName: any, setLastName: any, setSuccessAlert: any, setErrorAlert: any}) => {
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
      <>
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
      </>
    );
};

export default Me;
