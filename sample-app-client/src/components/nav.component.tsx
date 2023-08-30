import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Person, SupervisorAccount } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import AccountMenu from '../pages/AccountProfile/account-menu';

function Navbar({ isSuperUser }: any) {
    const navigate = useNavigate();

    const handleAdminButtonClick = () => {
      navigate("/admin");
    };

    const handleMeButtonClick = () => {
        navigate("/me");
    };

    return (
      <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton color="inherit" onClick={handleMeButtonClick}>
          <Person />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isSuperUser && (
            <IconButton color="inherit" onClick={handleAdminButtonClick}>
              <SupervisorAccount />
            </IconButton>
          )}
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default Navbar;
