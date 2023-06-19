import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Typography } from '@mui/material';
import { Logout, Person, SupervisorAccount } from '@mui/icons-material';

import AuthService from "../services/auth.service";

import { useNavigate } from 'react-router-dom';

function Navbar({ isSuperUser }: any) {
    const navigate = useNavigate();

    const handleLogout = () => {
      AuthService.logout();
      window.location.reload();
    };

    const handleAdminButtonClick = () => {
      navigate("/admin");
    };

    const handleMeButtonClick = () => {
        navigate("/me");
      };

    return (
        <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <IconButton color="inherit" onClick={handleMeButtonClick}>
            <Person />
          </IconButton>
        </Box>
        <Box>
          {isSuperUser && (
                <IconButton color="inherit" onClick={handleAdminButtonClick}>
                    <SupervisorAccount />
                </IconButton>
          )}
          <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default Navbar;
