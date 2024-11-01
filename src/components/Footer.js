
import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer style={{ marginTop: '250px', padding: '10px 0', fontStyle: 'bold'}}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Travel Booking Platform
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
