import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PaymentModule = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setMessage('Pago exitoso. Gracias por su compra!');
            setOpenSnackbar(true);
        }, 1000);
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        setCardNumber(value);
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4); 
        const formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1/$2'); 
        setExpiryDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3); 
        setCvv(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    width: "400px",
                    padding: "20px",
                    margin: "0 auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    <CreditCardIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    Módulo de Pago
                </Typography>
                <form onSubmit={handlePayment}>
                    <TextField
                        label="Número de tarjeta"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        inputProps={{
                            maxLength: 16,
                            pattern: "[0-9]*", // Regex to only allow digits
                        }}
                        required
                    />
                    <TextField
                        label="Fecha de expiración (MM/AA)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        inputProps={{
                            maxLength: 5, 
                            placeholder: "MM/AA"
                        }}
                        required
                    />
                    <TextField
                        label="Código CVV"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={cvv}
                        onChange={handleCvvChange}
                        inputProps={{
                            maxLength: 3, 
                            pattern: "[0-9]*", 
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            backgroundColor: "#007bff",
                            "&:hover": {
                                backgroundColor: "#0056b3",
                            },
                        }}
                    >
                        Pagar
                    </Button>
                </form>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
        </motion.div>
    );
};

export default PaymentModule;
