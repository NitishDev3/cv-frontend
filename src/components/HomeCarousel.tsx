// HomeCarousel.tsx

import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { CAROUSEL_IMAGES } from '../utils/constants';

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getSlideStyle = (index: number) => {
    const isActive = index === currentIndex;
    const isPrev = index === (currentIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
    // const isNext = index === (currentIndex + 1) % CAROUSEL_IMAGES.length;

    return {
      position: 'absolute',
      width: isActive ? '85%' : '65%',
      height: isActive ? '95%' : '75%',
      transition: 'all 0.5s ease-in-out',
      opacity: isActive ? 1 : 0.4,
      transform: isActive 
        ? 'translateX(-50%) scale(1)' 
        : isPrev 
          ? 'translateX(-120%) scale(0.8)' 
          : 'translateX(20%) scale(0.8)',
      zIndex: isActive ? 2 : 1,
      left: '50%'
      // top: '50%',
    };
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {CAROUSEL_IMAGES.map((image, index) => (
        <Paper
          key={image.id}
          elevation={index === currentIndex ? 8 : 4}
          sx={{
            ...getSlideStyle(index),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 1,
              }
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '10px',
                backgroundColor: 'white',
              }}
            />
          </Box>
          {/* <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: '10px',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '6px 12px',
              borderRadius: '20px',
              zIndex: 2,
            }}
          >
            {image.title}
          </Typography> */}
        </Paper>
      ))}
    </Box>
  );
};

export default HomeCarousel;