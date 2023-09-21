import React, { useEffect, useState } from 'react';
import UserService from '../../services/user.service';

import { User } from '../../types/user.type';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingScreen from '../../components/loading-screen.component';
import Navbar from '../../components/nav.component';

import authService from "../../services/auth.service";
import UsersTable from '../../components/users-table.component';
import UsersEditDialog from '../../components/users-edit-dialog.component';

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const [email, setEmail] = useState<string>('');
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const superuser = authService.isSuperUser();

  
  const handleCloseModal = () => {
    setEditedUser(null);
    setOpenModal(false);
  };

  const handleCloseSnackbar = () => {
    setSuccessAlert(null);
    setErrorAlert(null);
  };

  const handleEdit = (user: User) => {
    setEditedUser(user);
    setOpenModal(true);
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
    const auth = authService.isAuthenticated();
    if (!auth) {
      window.location.href = "/login";
    }
    else {
      setIsLoading(false);
    }

    UserService.getAllUsers()
      .then(response => {
        setUsers(response);
        setIsLoading(false);
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

  return (
    <>
    {isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar isSuperUser={superuser} />
        <div style={{ width: '100%' }}>
          <UsersTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
        <UsersEditDialog
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          editedUser={editedUser}
          setUsers={setUsers}
          setSuccessAlert={setSuccessAlert}
          setErrorAlert={setErrorAlert}
          setEmail={setEmail}
          setFirstName={setFirstName}
          setLastName={setLastName}
          email={email}
          firstName={first_name}
          lastName={last_name}
        />
    </>
    )}
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
    </>
  );
};

export default Admin;
