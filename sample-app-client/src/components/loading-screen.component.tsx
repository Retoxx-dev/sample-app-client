import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingScreen = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
};

export default LoadingScreen;
