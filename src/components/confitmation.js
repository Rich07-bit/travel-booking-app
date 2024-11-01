import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Confirmation = ({ bookingDetails }) => {
  const handleDownloadReceipt = () => {
    // Aquí puedes implementar la lógica para generar un PDF o descarga
    alert("Downloading receipt...");
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Booking Confirmation
        </Typography>
        <Typography variant="body1">
          <strong>Confirmation Number:</strong> {bookingDetails.confirmationNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Flight:</strong> {bookingDetails.flight}
        </Typography>
        <Typography variant="body1">
          <strong>Hotel:</strong> {bookingDetails.hotel}
        </Typography>
        <Typography variant="body1">
          <strong>Activities:</strong> {bookingDetails.activities}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleDownloadReceipt}
          sx={{ mt: 2 }}
        >
          Download Receipt
        </Button>
      </CardContent>
    </Card>
  );
};

export default Confirmation;
