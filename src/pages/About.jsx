import React from "react";
import { motion } from "framer-motion";
import background from "../assets/background.png";
import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material";

const About = () => {
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
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
                ABOUT US
              </Typography>
              <Typography variant="body1" align="center" color="white">
                Welcome to our platform. We are dedicated to providing high-quality
                architectural solutions. Our team of experts ensures that every
                project is handled with precision and creativity.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card elevation={3} sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography 
                    variant="h5" 
                    color="black" 
                    gutterBottom 
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      "&:hover": { textDecoration: "underline" }
                    }}
                  >
                    VISION
                  </Typography>
                  <Typography variant="body1" color="black">
                    - TO REDEFINE ARCHITECTURAL EXCELLENCE THROUGH INNOVATION AND SUSTAINABILITY.<br />
                    - TO CREATE SPACES THAT INSPIRE, ENHANCE FUNCTIONALITY, AND PROMOTE WELL-BEING.<br />
                    - TO INTEGRATE CUTTING-EDGE TECHNOLOGY WITH TIMELESS DESIGN PRINCIPLES.<br />
                    - TO CONTRIBUTE TO A SUSTAINABLE AND ECO-FRIENDLY BUILT ENVIRONMENT.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card elevation={3} sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography 
                    variant="h5" 
                    color="black" 
                    gutterBottom 
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      "&:hover": { textDecoration: "underline" }
                    }}
                  >
                    MISSION
                  </Typography>
                  <Typography variant="body1" color="black">
                    - TO DELIVER HIGH-QUALITY, CLIENT-FOCUSED ARCHITECTURAL SOLUTIONS.<br />
                    - TO DESIGN AESTHETICALLY PLEASING, FUNCTIONAL, AND SUSTAINABLE STRUCTURES.<br />
                    - TO BLEND CREATIVITY WITH PRACTICALITY IN EVERY PROJECT.<br />
                    - TO STAY AHEAD IN ARCHITECTURAL TRENDS AND TECHNOLOGICAL ADVANCEMENTS.<br />
                    - TO FOSTER A CULTURE OF CONTINUOUS LEARNING AND EXCELLENCE IN DESIGN.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <Card elevation={3} sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white", padding: 3, borderRadius: 2, marginTop: 4, textAlign: "center" }}>
            <CardContent>
              <Typography 
                variant="h5" 
                gutterBottom 
                color="white" 
                sx={{
                  letterSpacing: 1.5,
                  position: "relative",
                  display: "inline-block",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                ARCHITECT’S PROFILE
              </Typography>
              <Typography variant="body1" color="white" sx={{ textTransform: "uppercase", fontWeight: "bold", letterSpacing: 1 }}>
                NAME: AR. SHREYASH MILIND SHAMBHARKAR<br />
                EDUCATION: BACHELOR OF ARCHITECTURE FROM [UNIVERSITY NAME]<br />
                SPECIALIZATION: [FIELD OF EXPERTISE]<br />
                EXPERIENCE: [NUMBER] YEARS IN ARCHITECTURAL DESIGN AND PLANNING.<br />
                KEY ACHIEVEMENTS: [MAJOR AWARDS, RECOGNITIONS, OR NOTABLE PROJECTS].<br />
                DESIGN PHILOSOPHY: [A BRIEF STATEMENT ABOUT THE ARCHITECT’S DESIGN APPROACH].<br />
                CONTACT: EMAIL: [ARCHITECT'S EMAIL], WEBSITE: [ARCHITECT'S WEBSITE]
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
