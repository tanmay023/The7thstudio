import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook />, url: '#', label: 'Facebook' },
    { icon: <Twitter />, url: '#', label: 'Twitter' },
    { icon: <Instagram />, url: '#', label: 'Instagram' },
    { icon: <LinkedIn />, url: '#', label: 'LinkedIn' },
    { icon: <Email />, url: '#', label: 'Email' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(54, 53, 53))',
        color: 'white',
        py: 0,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 200 }}>
            © {new Date().getFullYear()} The 7th Studio. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                href={link.url}
                aria-label={link.label}
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'secondary.main',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;



