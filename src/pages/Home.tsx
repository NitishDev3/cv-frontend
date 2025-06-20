// Home.tsx
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import HomeCarousel from '../components/HomeCarousel';

const Home = () => {

    return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 4rem',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: '10%',
            bottom: '10%',
            width: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 3,
            background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Create Your Perfect CV
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.6,
            maxWidth: '90%',
          }}
        >
          Our CV builder is designed to help you create a professional and eye-catching CV in minutes. Stand out from the crowd with our modern templates.
        </Typography>

        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="large"
          sx={{
            width: 'fit-content',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 8px 2px rgba(33, 203, 243, .4)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Get Started
        </Button>

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(33, 203, 243, 0.1) 0%, rgba(33, 203, 243, 0) 70%)',
            filter: 'blur(30px)',
          }}
        />
      </Box>

      {/* Right Section - Carousel */}
      <Box sx={{ width: '50%' }}>
        <HomeCarousel />
      </Box>
    </Box>
  );
};

export default Home;