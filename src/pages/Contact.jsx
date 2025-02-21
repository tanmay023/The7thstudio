import React, { useState } from "react";
import background from "../assets/background.png";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Instagram, LinkedIn, Phone, Email, LocationOn } from "@mui/icons-material";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({ open: true, message: "Please fill all required fields!", severity: "warning" });
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/contact", formData);
      setSnackbar({ open: true, message: "Message sent successfully!", severity: "success" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting message:", error);
      setSnackbar({ open: true, message: "Failed to send message. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
        <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", padding: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              CONTACT US
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Send us a message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {["name", "email", "phone", "message"].map((field, index) => (
                    <TextField
                      key={index}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      value={formData[field]}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      required={field !== "phone"}
                      multiline={field === "message"}
                      rows={field === "message" ? 4 : 1}
                      sx={{
                        "& label": { color: "white" },
                        "& input, & textarea": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" },
                          "&:hover fieldset": { borderColor: "white" },
                          "&.Mui-focused fieldset": { borderColor: "white" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                      }}
                    />
                  ))}
                  <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Location</Typography>
                <Box sx={{ width: "100%", height: "400px", borderRadius: 1, overflow: "hidden" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14961.144076242472!2d78.1093265582969!3d20.37109369789724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd3e9003a86f851%3A0xe4969a92ea196a1c!2sThe%207th%20studio%20%7C%20Shreyash%20M%20S%20Architect%20%7C!5e0!3m2!1sen!2sin!4v1739220123385!5m2!1sen!2sin."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location map"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 3, backgroundColor: "white" }} />
                <Typography variant="h6" gutterBottom>Contact Details</Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Phone color="primary" />
                  <Typography>+91 8378028851, +91 9130110547</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Email color="primary" />
                  <Typography variant="body1">shreyashms21@gmail.com</Typography>
                  <IconButton href="https://www.instagram.com/the.7th.studio/" target="_blank" color="inherit">
                    <Instagram />
                  </IconButton>
                  <a href="https://www.instagram.com/the.7th.studio/" target="_blank" style={{ textDecoration: "none", color: "inherit" }}>The7thstudio</a> 
                  <IconButton href="https://www.linkedin.com/in/ar-shreyash-shambharkar-9071b1204/" target="_blank" color="primary">
                    <LinkedIn />   
                  </IconButton>
                  <a href="https://www.linkedin.com/in/ar-shreyash-shambharkar-9071b1204/" target="_blank" style={{ textDecoration: "none", color: "inherit" }}>AR. SHREYASH SHAMBHARKAR</a> 
                </Box> 
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
