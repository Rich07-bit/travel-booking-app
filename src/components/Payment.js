import React, { useState } from 'react';

const PaymentModule = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();

        // Simulando el procesamiento de pago
        setTimeout(() => {
            // Aquí podrías agregar lógica más compleja
            const isSuccess = Math.random() > 0.2; // 80% de probabilidad de éxito
            if (isSuccess) {
                setMessage('Pago exitoso. Gracias por su compra!');
            } else {
                setMessage('Error en el pago. Intente nuevamente.');
            }
        }, 1000);
    };

    return (
        <div>
            <h2>Módulo de Pago</h2>
            <form onSubmit={handlePayment}>
                <div>
                    <label>Número de tarjeta:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de expiración:</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Código CVV:</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pagar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PaymentModule;
