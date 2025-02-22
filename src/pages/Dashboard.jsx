import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Card, CardContent, CircularProgress, Input, Snackbar, Alert
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Fetch messages from MongoDB
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/contactMessages");
        setMessages(data);
      } catch (error) {
        console.error("❌ Error fetching messages:", error.response ? error.response.data : error.message);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
    navigate(0); // ✅ Cleaner way to reload after logout
  };

  // Delete message from MongoDB
  const handleDeleteMessage = async (id) => {
    try {
      setDeletingMessageId(id);
      await axios.delete(`http://localhost:5000/contactMessages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("❌ Error deleting message:", error.response ? error.response.data : error.message);
    } finally {
      setDeletingMessageId(null);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Convert file to Base64 & upload to MongoDB
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      try {
        const fileType = selectedFile.type.startsWith("image") ? "image" : "video";
        await axios.post("http://localhost:5000/uploadMedia", {
          type: fileType,
          base64: reader.result,
        });

        setAlertOpen(true); // Show success alert
        setSelectedFile(null); // Clear input
      } catch (error) {
        console.error("❌ Error uploading file:", error.response ? error.response.data : error.message);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <Container style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </Button>

      {/* File Upload Section */}
      <Card style={{ marginBottom: "40px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Upload Images/Videos</Typography>
          <Input type="file" onChange={handleFileChange} accept="image/*,video/*" />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            style={{ marginLeft: "10px" }}
          >
            {uploading ? <CircularProgress size={20} /> : "Upload"}
          </Button>
        </CardContent>
      </Card>

      {/* Contact Form Responses */}
      <Card style={{ marginBottom: "40px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Contact Form Responses</Typography>
          {loadingMessages ? (
            <CircularProgress />
          ) : messages.length > 0 ? (
            <TableContainer component={Paper} style={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Message</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg._id}>
                      <TableCell>{msg.name}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell>{msg.phone}</TableCell>
                      <TableCell>{msg.message}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteMessage(msg._id)}
                          disabled={deletingMessageId === msg._id}
                        >
                          {deletingMessageId === msg._id ? <CircularProgress size={20} /> : "Delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No messages found.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Success Alert */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          ✅ Media added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
