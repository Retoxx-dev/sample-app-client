import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Moment from 'moment';

const MFASettingsBox = ({ isEnabled, enableDate, onEnableClick, onDisableClick }: {isEnabled: any, enableDate: any, onEnableClick: any, onDisableClick: any}) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Multi-Factor Authentication (MFA) Settings
      </Typography>
      {isEnabled ? (
        <div>
          <Typography variant="body1" gutterBottom>
            MFA is currently enabled on your account.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {/* Enabled on: {enableDate} */}
            Enabled on: {Moment(enableDate).format('Do MMMM YYYY, h:mm:ss a')}
          </Typography>
          <Button variant="outlined" onClick={onDisableClick} sx={{ marginTop: 2 }}>
            Disable MFA
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="body1" gutterBottom>
            Enhance the security of your account by enabling Two-Factor Authentication (2FA). 2FA adds an extra layer of protection to your account by requiring two forms of verification before you can log in. This greatly reduces the risk of unauthorized access even if your password is compromised.
          </Typography>
          <Typography variant="body1" gutterBottom>
            MFA is currently disabled on your account.
          </Typography>
          <Button variant="contained" onClick={onEnableClick} color="primary" sx={{ marginTop: 2 }}>
            Enable MFA
          </Button>
        </div>
      )}
    </Box>
  );
};

export default MFASettingsBox;
