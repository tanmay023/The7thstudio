import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Visualization = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ Lightbox state
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Track if user is Admin

  useEffect(() => {
    // ✅ Check if admin is logged in (Example: from localStorage)
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    const fetchMedia = async () => {
      try {
        const response = await fetch("http://localhost:5000/getMedia");
        const result = await response.json();

        console.log("🔍 Full API Response:", JSON.stringify(result, null, 2));

        if (!result || typeof result !== "object") {
          throw new Error("Invalid API response");
        }

        if (Array.isArray(result.media)) {
          setMedia(result.media);
        } else {
          console.error("❌ Expected an array but got:", result.media);
        }
      } catch (error) {
        console.error("❌ Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // ✅ Delete Media Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;

    try {
      const response = await fetch(`http://localhost:5000/deleteMedia/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));
        alert("✅ Media deleted successfully!");
      } else {
        alert("❌ Failed to delete media.");
      }
    } catch (error) {
      console.error("❌ Error deleting media:", error);
      alert("❌ Error deleting media. Please try again.");
    }
  };

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
                    <Grid item xs={12} sm={6} md={4} key={item._id} sx={{ position: "relative" }}>
                      {item.type && item.type.includes("image") ? (
                        <img
                          src={item.base64}
                          alt="Media"
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            cursor: "pointer", // ✅ Clickable for zoom
                          }}
                          onClick={() => setSelectedImage(item.base64)} // ✅ Open Lightbox
                        />
                      ) : item.type && item.type.includes("video") ? (
                        <video controls style={{ width: "100%", borderRadius: "8px" }}>
                        <source src={`data:${item.type};base64,${item.base64}`} type={item.type} />
                        Your browser does not support the video tag.
                        </video>

                      ) : (
                        <Typography variant="h6" color="white">Unsupported format</Typography>
                      )}

                      {/* ✅ Show Delete Button ONLY if Admin is Logged In */}
                      {isAdmin && (
                       <IconButton
                       onClick={() => handleDelete(item._id)}
                       sx={{
                         position: "absolute",
                         top: 8,
                         right: 8,
                         backgroundColor: "rgba(255, 0, 0, 0.8)", // 🔴 Red Background
                         color: "white",
                         borderRadius: "50%", // ✅ Round Shape
                         width: 40, // ⭕ Size
                         height: 40, // ⭕ Size
                         boxShadow: "0px 4px 6px rgba(0,0,0,0.3)", // 📌 Shadow Effect
                         "&:hover": {
                           backgroundColor: "rgba(255, 0, 0, 1)", // 🔥 Darker Red on Hover
                         },
                       }}
                     >
                       <DeleteIcon />
                     </IconButton>
                     
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

      {/* ✅ Lightbox (Dialog for Image Zoom) */}
      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent sx={{ position: "relative", padding: 0 }}>
          <IconButton
            aria-label="close"
            onClick={() => setSelectedImage(null)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Magnified View" style={{ width: "100%", height: "auto" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Visualization;
