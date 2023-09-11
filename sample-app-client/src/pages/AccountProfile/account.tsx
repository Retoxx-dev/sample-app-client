import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";

import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MFASettingsBox from "../../components/mfa.component";
import mfaService from "../../services/mfa.service";
import QrDialog from "../../components/qr.component";
import Me from "../../components/me.component";
import LoadingScreen from "../../components/loading-screen.component";
import Navbar from "../../components/nav.component";

export default function Account() {
    const currentUser = authService.getCurrentLocalUser();
    const [email, setEmail] = useState(currentUser.email);
    const [first_name, setFirstName] = useState(currentUser.first_name);
    const [last_name, setLastName] = useState(currentUser.last_name);

    const [errorAlert, setErrorAlert] = useState<string | null>(null);
    const [successAlert, setSuccessAlert] = useState<string | null>(null);

    const [mfaStatus, setMfaStatus] = useState<boolean | null>(false);
    const [mfaEnableDate, setMfaEnableDate] = useState<string | null>(null);

    const [ModalOpen, setModalOpen] = useState(false);

    const [base32, setbase32] = useState<string | null>(null);
    const [qrcode, setQrCode] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const superuser = authService.isSuperUser();

    const handleCloseSnackbar = () => {
        setSuccessAlert(null);
        setErrorAlert(null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Setup loader and check MFA status on page load
    useEffect(() => {
        mfaService.checkMfaStatus().then((response) => {
            if(response.otp_enabled && response.otp_verified === true) {
                setMfaStatus(true);
                setMfaEnableDate(response.otp_enabled_at);
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log("An error occurred while trying to check MFA status: " + error);
            if(error.response && error.response.status === 401 && error.response.data.detail === "Unauthorized") {
                setErrorAlert("You're not authorized to perform this action");
            }
        });
    }, []);

    // Handle enabling MFA, open dialog with QR code
    const handleEnableClick = () => {
        mfaService.generateMfa().then((response) => {
            console.log(response.otp_base32)
            setbase32(response.otp_base32);
            setQrCode(response.otp_auth_url);
            setModalOpen(true);
        }).catch((error) => {
            console.log("An error occurred while trying to enable MFA: " + error);
            if(error.response && error.response.status === 401 && error.response.data.detail === "Unauthorized") {
                setErrorAlert("You're not authorized to perform this action");
            }
        });
    };

    // Handle disabling MFA
    const handleDisableClick = () => {
        mfaService.disableMfa().then((response) => {
        if (response.otp_enabled === false) {
            setMfaStatus(false);
            setMfaEnableDate(null);
            setSuccessAlert("MFA disabled successfully");
        }  
        });
    };

    return (
        <>
        {isLoading ? (
            <LoadingScreen />
        ) : (
        <>
            <Navbar isSuperUser={superuser} />
            <Box sx={{ flexGrow: 1, mx: 'auto', mt: 4, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Me
                            currentUser={currentUser}
                            email={email}
                            first_name={first_name}
                            last_name={last_name}
                            setEmail={setEmail}
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                            setSuccessAlert={setSuccessAlert}
                            setErrorAlert={setErrorAlert}
                        />
                    
                        <MFASettingsBox
                            isEnabled={mfaStatus}
                            enableDate={mfaEnableDate}
                            onEnableClick={handleEnableClick}
                            onDisableClick={handleDisableClick}
                        />
                    </Grid>
                    <Grid xs={6} md={4}>
                        
                    </Grid>
                    <Grid xs={6} md={4}>

                    </Grid>
                    <Grid xs={6} md={8}>
                    
                    </Grid>
                </Grid>
            </Box>
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
        <QrDialog
          open={ModalOpen}
          handleCloseModal={handleCloseModal}
          qrcode={qrcode}
          base32={base32}
          setMfaStatus={setMfaStatus}
          setMfaEnableDate={setMfaEnableDate}
          setSuccessAlert={setSuccessAlert}
          setErrorAlert={setErrorAlert}
        />
        </>
    );
}