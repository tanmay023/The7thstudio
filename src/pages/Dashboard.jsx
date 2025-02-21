import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Card, CardContent, CircularProgress
} from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    // Fetch contact messages
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contactMessages"));
        const messagesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesList);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload();
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, "contactMessages", id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Container style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </Button>

      {/* Contact Form Responses */}
      <Card style={{ marginBottom: "40px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Contact Form Responses</Typography>
          {loadingMessages ? (
            <Typography>Loading messages...</Typography>
          ) : messages.length > 0 ? (
            <TableContainer component={Paper}>
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
                    <TableRow key={msg.id}>
                      <TableCell>{msg.name}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell>{msg.phone}</TableCell>
                      <TableCell>{msg.message}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeleteMessage(msg.id)}>
                          Delete
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
    </Container>
  );
};

export default Dashboard;
