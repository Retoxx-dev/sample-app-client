import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import MFASettingsBox from "../../components/mfa.component";
import mfaService from "../../services/mfa.service";
import QrDialog from "../../components/qr.component";
import MeProfile from "../../components/me-profile.component";
import LoadingScreen from "../../components/loading-screen.component";
import Navbar from "../../components/nav.component";
import MeImage from "../../components/me-image.component";

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

    //Image upload
    const [imageObject, setImageObject] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const superuser = authService.isSuperUser();

    const handleCloseSnackbar = () => {
        setSuccessAlert(null);
        setErrorAlert(null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const auth = authService.isAuthenticated();
        if (!auth) {
            window.location.href = "/login";
        }
        else {
            // Load profile image
            userService.getUserProfileImage().then((response) => {
                setSelectedImage(response.profile_picture_path);
            }).catch(() => {
                setErrorAlert("An error occurred while trying to get the current user's profile image");
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, []);

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
                        <MeImage
                            imageObject={imageObject}
                            setImageObject={setImageObject}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            isPhotoSelected={isPhotoSelected}
                            setIsPhotoSelected={setIsPhotoSelected}
                        />
                        <MeProfile
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

                        {/* <MFASettingsBox
                            isEnabled={mfaStatus}
                            enableDate={mfaEnableDate}
                            onEnableClick={handleEnableClick}
                            onDisableClick={handleDisableClick}
                        /> */}
                    </Grid>
                    <Grid xs={6} md={4}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Settings
                        </Typography>
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