import React from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const BookingForm = () => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Complete Your Booking
        </Typography>
        <form>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" />
          <TextField label="Email" type="email" fullWidth margin="normal" variant="outlined" />
          <TextField label="Phone" type="tel" fullWidth margin="normal" variant="outlined" />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Book Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
