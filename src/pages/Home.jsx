import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  FiberManualRecord as DotIcon 
} from '@mui/icons-material';

const sliderImages = [
  {
    url: s1,
    title: "Landscape Design",
    description: "Creating outdoor harmony"
  },
  {
    url: s2,
    title: "Interior Design",
    description: "Beautiful living spaces"
  },
  {
    url: s3,
    title: "Architecture",
    description: "Modern architectural solutions"
  },
  {
    url: s4,
    title: "Urban Planning",
    description: "Sustainable city development"
  }
];

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '99vw',
  height: 'calc(100vh - 70px)', 
  overflow: 'hidden',
  backgroundColor: theme.palette.common.black,
  marginTop: 0,
  marginBottom: 0,
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)', 
  },
}));

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.5s ease-in-out',
});

const SlideOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  padding: theme.spacing(4),
  color: 'white',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  zIndex: 2,
}));

const DotContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2,
}));

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'common.black'
    }}>
      <SliderContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {sliderImages.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <SlideImage
              src={slide.url}
              alt={slide.title}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <SlideOverlay>
              <Typography 
                variant={isMobile ? 'h4' : 'h2'} 
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {slide.title}
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'}
                sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                {slide.description}
              </Typography>
            </SlideOverlay>
          </Box>
        ))}

        <NavigationButton
          sx={{ left: theme.spacing(2) }}
          onClick={handlePrevSlide}
          size={isMobile ? 'medium' : 'large'}
        >
          <ArrowBack />
        </NavigationButton>

        <NavigationButton
          sx={{ right: theme.spacing(2) }}
          onClick={handleNextSlide}
          size={isMobile ? 'medium' : 'large'}
        >
          <ArrowForward />
        </NavigationButton>

        <DotContainer>
          {sliderImages.map((_, index) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => handleDotClick(index)}
              sx={{
                color: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              <DotIcon fontSize="small" />
            </IconButton>
          ))}
        </DotContainer>
      </SliderContainer>
    </Box>
  );
};

export default Home;