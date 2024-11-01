import React from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const PaymentForm = () => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Complete Your Payment
        </Typography>
        <form>
          <TextField
            label="Card Number"
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
          />
          <TextField
            label="Expiration Date"
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="MM/YY"
          />
          <TextField
            label="CVV"
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Pay Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
