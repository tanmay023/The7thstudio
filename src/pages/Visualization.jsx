import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import { Container, Typography, Box, Card, CardContent, Grid, CircularProgress } from "@mui/material";

const Visualization = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("http://localhost:5000/getMedia");
        const result = await response.json();
    
        console.log("🔍 API Response:", result);  // ✅ Log entire response
    
        if (!result || typeof result !== "object") {
          throw new Error("Invalid API response");
        }
    
        if (Array.isArray(result.media)) {
          setMedia(result.media);  // ✅ Ensure media is set correctly
        } else {
          console.error("❌ Expected an array but got:", result.media);
        }
      } catch (error) {
        console.error("❌ Error fetching media:", error);
      }
    };
    
    

    fetchMedia();
  }, []);

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

            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Grid container spacing={2}>
                {media.length > 0 ? (
                  media.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      {item.type.startsWith("image/") ? (
                        <img src={item.base64} alt="Media" style={{ width: "100%", borderRadius: "8px" }} />
                      ) : (
                        <video controls style={{ width: "100%", borderRadius: "8px" }}>
                          <source src={item.base64} type={item.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h6" align="center" color="white">
                    No media found.
                  </Typography>
                )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Visualization;
