import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import { Container, Typography, Box, Card, CardContent, Grid, CircularProgress } from "@mui/material";

const Visualization = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={3}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom color="white">
              VISUALIZATION
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Visualization;