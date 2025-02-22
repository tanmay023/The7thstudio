import React from "react";
import { Box, Container, Card, CardContent, Typography } from "@mui/material";
import background from "../assets/background.png"; // Make sure this path is correct

const Blog = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              BLOG PAGE
            </Typography>
            <Typography variant="h6" color="grey.300">
              Will be updated soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Blog;
