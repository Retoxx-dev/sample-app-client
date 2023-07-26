import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service';

import { User } from '../types/user.type';

import { Dialog, DialogContent, TextField, DialogActions, Button, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AdminComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const [email, setEmail] = useState<string>('');
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');

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
 
  const handleCloseModal = () => {
    setEditedUser(null);
    setOpenModal(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const updatedUser = {
      email: email,
      first_name: first_name,
      last_name: last_name,
    };

    UserService.updateUser(editedUser?.id as string, updatedUser).then(
      () => {
      UserService.getAllUsers()
        .then(response => {
          setUsers(response);
        })})
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    setSuccessAlert("User details updated successfully");
    handleCloseModal();
  };

  const handleEdit = (user: User) => {
    setEditedUser(user);
    setOpenModal(true);
  };
  
  const handleCloseSnackbar = () => {
    setSuccessAlert(null);
    setErrorAlert(null);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete user with ID: ${id}`);
    UserService.deleteUser(id).then(
      () => {
        setSuccessAlert("User with ID " + id + " deleted successfully");
        UserService.getAllUsers()
        .then(response => {
          setUsers(response);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
            setErrorAlert("User with ID " + id + " not found");
        }
        else {
            setErrorAlert("Unknown error, check browser console for more details");
        }
      }
    );
  };

  useEffect(() => {
    UserService.getAllUsers()
      .then(response => {
        setUsers(response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
            setErrorAlert("You're not authorized to view this page");
        }
        else {
            setErrorAlert("Unknown error, check browser console for more details");
        }
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 400 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      width: 130, 
      sortable: false, 
      filterable: false, 
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleEdit(params.row as User)}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(params.row.id as string)}
            color="secondary"
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
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
          </Box>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" color="primary" onClick={handleFormSubmit}>
              Save
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>

    </div>
  );
};

export default AdminComponent;
