import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import mfaService from "../services/mfa.service";

import QRCode from 'qrcode.react';
import Box from "@mui/material/Box";

const QrDialog = ({open, handleCloseModal, base32, qrcode, setMfaStatus, setMfaEnableDate, setSuccessAlert, setErrorAlert}: {open: any, handleCloseModal: any, base32: any, qrcode: any, setMfaStatus: any, setMfaEnableDate: any, setSuccessAlert: any, setErrorAlert: any}) => {
  const [otpToken, setOtpToken] = useState("");

  const handleSubmit = () => {
    const otpTokenObject = {
      token: otpToken
    };

    mfaService.enableMfa(otpTokenObject).then(
      (response) => {
        console.log("MFA enabled successfully");
        setMfaStatus(true);
        setMfaEnableDate(response.otp_enabled_at)
        handleCloseModal();
        setSuccessAlert("MFA enabled successfully");
      }).catch((error) => {
        console.log("An error occurred while trying to enable MFA: " + error);
        if(error.response && error.response.status === 400 && error.response.data.detail.code === "INVALID_OTP_TOKEN") {
          setErrorAlert("Invalid verification code, please try again");
        }
    });
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Two-Factor Authentication (2FA)</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Configuring Google Authenticator
        </DialogContentText>
        <ol>
          <li>Install a 2FA authentication app on your mobile device (e.g., Google Authenticator, Authy).</li>
          <li>Open the authentication app and select the option to add a new account or scan a QR code.</li>
          <li>Manually enter the following details or scan the QR code below:</li>
        </ol>
        <DialogContentText>
          Scan QR Code
        </DialogContentText>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <QRCode
            value={qrcode}
            size={200}
          />
        </Box>
        <DialogContentText>
          Or enter code into your app
        </DialogContentText>
        <p>SecretKey: {base32} (Base32 encoded)</p>
        <DialogContentText>
          Verify Code
        </DialogContentText>
        <p>To set up your Multi Factor, please enter the veryfication code from your device</p>
        <TextField
          margin="dense"
          id="otp_token"
          name="otp_token"
          label="Verification Code"
          value={otpToken}
          onChange={(event) => setOtpToken(event.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            onClick={handleCloseModal}
            sx={{ mb: 2, flex: 1, marginRight: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, flex: 1 }}
            onClick={handleSubmit}
          >
            Activate
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default QrDialog;
