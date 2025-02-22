import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";

// Sample service details
const servicesList = [
  {
    title: "Architectural Design",
    description:
      "We provide innovative architectural designs that blend aesthetics with functionality. Our expert team ensures that every structure is both visually appealing and highly practical, customized to suit your specific needs and environment.",
    url: s1,
  },
  {
    title: "Interior Designing",
    description:
      "Our interior design services transform spaces into elegant and functional areas. From residential to commercial projects, we focus on textures, color schemes, lighting, and furniture selection to create harmonious and comfortable environments.",
    url: s2,
  },
  {
    title: "Landscape Planning",
    description:
      "Our landscape design services enhance outdoor spaces with greenery, water features, and sustainable planning. Whether it's a backyard, terrace garden, or large-scale urban park, we create eco-friendly and visually stunning landscapes.",
    url: s3,
  },
  {
    title: "3D Visualization",
    description:
      "We provide high-quality 3D rendering and walkthroughs to help clients visualize their projects before construction. Our advanced 3D modeling technology ensures realistic visual representation with accurate textures and lighting.",
    url: s4,
  },
  {
    title: "Construction Management",
    description:
      "We oversee every phase of the construction process, ensuring efficiency, cost-effectiveness, and adherence to design specifications. Our team coordinates contractors, monitors progress, and ensures timely project completion.",
    url: s1,
  },
  {
    title: "Urban Planning",
    description:
      "Our urban planning solutions focus on sustainable and smart city development. We analyze demographics, infrastructure, and environmental factors to create comprehensive plans for future urban expansion.",
    url: s2,
  },
];

const Services = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
      <Container maxWidth="lg">
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              OUR SERVICES
            </Typography>
            <Grid container spacing={3}>
              {servicesList.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      padding: 2,
                    }}
                  >
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={140}
                        sx={{ bgcolor: "grey.800" }}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="140"
                        image={service.url} // ✅ Fixed issue
                        alt={service.title}
                      />
                    )}
                    <CardContent>
                      {loading ? (
                        <>
                          <Skeleton
                            variant="text"
                            width="80%"
                            sx={{ bgcolor: "grey.800" }}
                          />
                          <Skeleton
                            variant="text"
                            width="100%"
                            sx={{ bgcolor: "grey.800" }}
                          />
                          <Skeleton
                            variant="rectangular"
                            height={100}
                            sx={{ bgcolor: "grey.800" }}
                          />
                        </>
                      ) : (
                        <>
                          <Typography variant="h6" gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2">
                            {service.description}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Services;
