import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ArticleIcon from '@mui/icons-material/Article';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdminStatus();
    window.addEventListener("storage", checkAdminStatus);

    return () => {
      window.removeEventListener("storage", checkAdminStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.dispatchEvent(new Event("storage")); // ✅ Instantly updates Navbar
    navigate("/");
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Portfolio', path: '/portfolio', icon: <WorkIcon /> },
    { text: 'Services', path: '/services', icon: <BuildIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
    { text: 'Blog', path: '/blog', icon: <ArticleIcon /> },
    { text: 'Visualization', path: '/Visualization', icon: <BurstModeIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #000, #222, #000)' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, margin: '5px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={logo}
                alt="Studio logo"
                style={{
                  width: '55px',
                  height: '55px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Ubuntu, sans-serif' }}>
                The 7th Studio
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '0.1em', color: 'white', fontFamily: 'Ubuntu, sans-serif' }}>
                Shreyash M.S
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '0.1em', color: 'white', fontFamily: 'Ubuntu, sans-serif' }}>
                Architecture
              </Typography>
            </Box>
          </Box>
          {isMobile ? (
            <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Fade in={true} key={item.text} timeout={800}>
                  <Button
                    component={Link}
                    to={item.path}
                    color="inherit"
                    startIcon={item.icon}
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'primary.light',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:after': { width: '80%' },
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </Fade>
              ))}
              {isAdmin ? (
                <Fade in={true} timeout={800}>
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    color="primary"
                    startIcon={<DashboardIcon />}
                    sx={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Dashboard
                  </Button>
                </Fade>
              ) : (
                <Fade in={true} timeout={800}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    color="inherit"
                    sx={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Login
                  </Button>
                </Fade>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
