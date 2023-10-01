import { Box, Button, Grid, Typography } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import userService from "../services/user.service";

const MeImage = ({imageObject, setImageObject, selectedImage, setSelectedImage, isPhotoSelected, setIsPhotoSelected} : 
    {imageObject: any, setImageObject: any, selectedImage: any, setSelectedImage: any, isPhotoSelected: any, setIsPhotoSelected: any}) => {
    

    // Function to handle file input change
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setImageObject(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setIsPhotoSelected(true);
            console.log(imageUrl);
        }
    };

    const handleSave = async () => {
        userService.updateUserProfileImage(imageObject).then(() => {
                setIsPhotoSelected(false);
                setSelectedImage(null);
                setImageObject(null);
                window.location.reload();
            }
        );
    }

    return (
      <>
        <Typography variant="h5" component="h1" gutterBottom>
            Profile
        </Typography>

        <Box
          component="img"
          src={selectedImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          sx={{ mb: 2, width: 1, maxHeight: 1 }}
        />
        
        <input
          type="file"
          id="upload-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {isPhotoSelected ? (
          <>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <label htmlFor="upload-input">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    component="span"
                  >
                    Change
                  </Button>
                </label>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  component="span"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
            <label htmlFor="upload-input">  
                <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
                component="span"
                >
                Change Photo
                </Button>
            </label>
        )}
      </>
    );
};

export default MeImage;
