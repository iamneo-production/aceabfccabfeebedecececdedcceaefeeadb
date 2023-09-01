import {Box} from '@mui/material'
const BackgroundWrapper = ({ children }) => {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(../assets/retrosupply-jLwVAUtLOAQ-unsplash.jpg")', // Pastel wallpaper background
          overflow: 'hidden', // Prevent background from overflowing
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1, // Place the background behind other content
          backgroundColor : "#D0BFFF"
        }}
      >
        {children}
      </Box>
    );
  };
  
  export default BackgroundWrapper;