import React, { useState, useEffect, useContext } from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { IoMdAirplane } from "react-icons/io";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
  Box,
  CircularProgress,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Swal from "sweetalert2";
import { useUser } from "./UserContext"; 
import { motion } from "framer-motion";
import PaymentModule from "./Payment";

const airportCodes = [
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport" },
  { code: "LAX", name: "Los Angeles International Airport" },
  { code: "JFK", name: "John F. Kennedy International Airport" },
  { code: "ORD", name: "O'Hare International Airport" },
  { code: "DEN", name: "Denver International Airport" },
  { code: "FRA", name: "Frankfurt Airport" },
  { code: "LHR", name: "London Heathrow Airport" },
  { code: "NRT", name: "Narita International Airport" },
  { code: "HND", name: "Haneda Airport" },
  { code: "ICN", name: "Incheon International Airport" },
  { code: "SIN", name: "Changi Airport" },
  { code: "SYD", name: "Sydney Kingsford Smith Airport" },
  { code: "YVR", name: "Vancouver International Airport" },
  { code: "BKK", name: "Suvarnabhumi Airport" },
  { code: "SFO", name: "San Francisco International Airport" },
  { code: "DXB", name: "Dubai International Airport" },
  { code: "YYZ", name: "Toronto Pearson International Airport" },
  { code: "MEX", name: "Mexico City International Airport" },
  { code: "BOG", name: "El Dorado International Airport" },
  { code: "CPH", name: "Copenhagen Airport" },
];

const FlightSearch = ({ onCategoryChange }) => {
  const { userEmail } = useUser(); // Captura el correo del usuario logueado
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seatDialogOpen, setSeatDialogOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);


  useEffect(() => {
    onCategoryChange();
  }, [onCategoryChange]);

  const handleSearchFlights = async () => {
    const apiKey = process.env.REACT_APP_AMADEUS_API_KEY;
    const apiSecret = process.env.REACT_APP_AMADEUS_API_SECRET;

    if (!from || !to || !departureDate || !returnDate) {
      setErrorMessage("Por favor, llene todos los campos.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      const tokenResponse = await fetch(
        `https://test.api.amadeus.com/v1/security/oauth2/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
        }
      );

      if (!tokenResponse.ok) throw new Error("Failed to fetch access token");

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const flightResponse = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&travelClass=ECONOMY&nonStop=false`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!flightResponse.ok) throw new Error("Failed to fetch flight data");

      const flightData = await flightResponse.json();

      const uniqueFlights = Array.from(
        new Set(
          flightData.data.map((flight) =>
            `${flight.itineraries[0].segments[0].departure.iataCode}-${flight.itineraries[0].segments[0].arrival.iataCode}-${flight.price.total}`
          )
        )
      ).map((key) => {
        return flightData.data.find(
          (flight) =>
            `${flight.itineraries[0].segments[0].departure.iataCode}-${flight.itineraries[0].segments[0].arrival.iataCode}-${flight.price.total}` ===
            key
        );
      });

      const filtered = uniqueFlights.filter(
        (flight) =>
          flight.itineraries[0].segments[0].departure.iataCode === from &&
          flight.itineraries[0].segments[0].arrival.iataCode === to
      );

      setFlights(uniqueFlights || []);
      setFilteredFlights(filtered);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    setOpenDialog(true);
  };

  const handleConfirmFlight = async () => {
    try {
      console.log("Selected flight: ", selectedFlight);
  
      Swal.fire({
        title: "Confirmación de vuelo",
        text: `Has seleccionado el vuelo de ${selectedFlight.itineraries[0].segments[0].departure.iataCode} a ${selectedFlight.itineraries[0].segments[0].arrival.iataCode}. En el asiento ${selectedSeat}.`,
        icon: "success",
        confirmButtonText: "Proceder al Pago",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setPaymentDialogOpen(true); // Abrir el diálogo de pago
        }
      });
    } catch (error) {
      console.error("Error sending flight notification:", error);
    } finally {
      setOpenDialog(false);
      setSeatDialogOpen(false);
    }
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const duration = Math.abs(arrival - departure) / 36e5;
    return `${Math.floor(duration)}h ${Math.round((duration % 1) * 60)}m`;
  };

  const openSeatDialog = () => {
    setOpenDialog(false);
    setSeatDialogOpen(true);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const renderSeatMap = () => {
    const seats = [
      { code: "1A", icon: <IoMdAirplane /> },
      { code: "1B", icon: <IoMdAirplane /> },
      { code: "1C", icon: <IoMdAirplane /> },
      { code: "1D", icon: <IoMdAirplane /> },
      { code: "2A", icon: <IoMdAirplane /> },
      { code: "2B", icon: <IoMdAirplane /> },
      { code: "2C", icon: <IoMdAirplane /> },
      { code: "2D", icon: <IoMdAirplane /> },
      { code: "3A", icon: <IoMdAirplane /> },
      { code: "3B", icon: <IoMdAirplane /> },
      { code: "3C", icon: <IoMdAirplane /> },
      { code: "3D", icon: <IoMdAirplane /> },
      { code: "4A", icon: <IoMdAirplane /> },
      { code: "4B", icon: <IoMdAirplane /> },
      { code: "4C", icon: <IoMdAirplane /> },
      { code: "4D", icon: <IoMdAirplane /> },
      { code: "5A", icon: <IoMdAirplane /> },
      { code: "5B", icon: <IoMdAirplane /> },
      { code: "5C", icon: <IoMdAirplane /> },
      { code: "5D", icon: <IoMdAirplane /> },
    ];

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          mt: 2,
        }}
      >
        {seats.map(({ code, icon }) => (
          <Button
            key={code}
            variant={selectedSeat === code ? "contained" : "outlined"}
            onClick={() => handleSeatSelection(code)}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "8px",
              backgroundColor: selectedSeat === code ? "#007bff" : "#f0f0f0",
              color: selectedSeat === code ? "#fff" : "#000",
              "&:hover": {
                backgroundColor: selectedSeat === code ? "#0056b3" : "#d0d0d0",
              },
            }}
          >
            {icon} {code}
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >

    <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Búsqueda de Vuelos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            options={airportCodes}
            getOptionLabel={(option) => option.code}
            renderInput={(params) => (
              <TextField {...params} label="Desde" variant="outlined" />
            )}
            onChange={(event, newValue) => setFrom(newValue?.code)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={airportCodes}
            getOptionLabel={(option) => option.code}
            renderInput={(params) => (
              <TextField {...params} label="Hasta" variant="outlined" />
            )}
            onChange={(event, newValue) => setTo(newValue?.code)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fecha de Salida"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDepartureDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fecha de Regreso"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setReturnDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchFlights}
            disabled={loading}
            sx={{
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              width: "100%",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Buscar Vuelos"}
          </Button>
        </Grid>
      </Grid>
      {filteredFlights.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center">Resultados de Vuelos</Typography>
          <Box
            sx={{
              paddingTop: 4,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {filteredFlights.map((flight) => (
              <Card
                key={flight.id}
                onClick={() => handleFlightClick(flight)}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "16px",
                  padding: "16px",
                  margin: "8px",
                  width: "calc(30% - 16px)", // Ajustar el tamaño de las cartas
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#e3f2fd", // Color al pasar el mouse
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
                    {flight.itineraries[0].segments[0].departure.iataCode}{" "}
                    <GiAirplaneDeparture style={{ color: "green", fontSize: "1.5em" }} /> ➔{" "}
                    {flight.itineraries[0].segments[0].arrival.iataCode}{" "}
                    <GiAirplaneArrival style={{ color: "red", fontSize: "1.5em" }} />
                  </Typography>
                  <Typography variant="body2" align="center">
                    Duración: {calculateDuration(flight.itineraries[0].segments[0].departure.at, flight.itineraries[0].segments[0].arrival.at)}
                  </Typography>
                  <Typography variant="body2" align="center">
                    Precio: {flight.price.total} {flight.price.currency}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Detalles del Vuelo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedFlight && (
              <div>
                <Typography>
                  Vuelo de {selectedFlight.itineraries[0].segments[0].departure.iataCode} a {selectedFlight.itineraries[0].segments[0].arrival.iataCode}
                </Typography>
                <Typography>
                  Duración: {calculateDuration(selectedFlight.itineraries[0].segments[0].departure.at, selectedFlight.itineraries[0].segments[0].arrival.at)}
                </Typography>
                <Typography>
                  Precio: {selectedFlight.price.total} {selectedFlight.price.currency}
                </Typography>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={openSeatDialog} color="primary">
            Seleccionar Asiento
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={seatDialogOpen} onClose={() => setSeatDialogOpen(false)}>
        <DialogTitle>Selección de Asiento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecciona tu asiento:
          </DialogContentText>
          {renderSeatMap()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSeatDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmFlight} color="primary" disabled={!selectedSeat}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
</motion.div>
  );
};

export default FlightSearch;