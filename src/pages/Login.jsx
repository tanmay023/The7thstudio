import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import { TextField, Button, Container, Typography, Box, Card, CardContent, Snackbar, Alert } from "@mui/material";

const Login = ({ setIsAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.email === "admin@example.com" && formData.password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });

      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setSnackbar({ open: true, message: "Invalid credentials", severity: "error" });
    }
    
    setLoading(false);
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
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={3} sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", padding: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom color="white">
              ADMIN LOGIN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "white !important" },
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "white !important" },
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Login;
