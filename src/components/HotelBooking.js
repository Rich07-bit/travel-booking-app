import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { IoBed } from "react-icons/io5";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const HotelBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [city, setCity] = useState("");

  // Datos simulados
  const mockHotelsData = {
    NYC: [
      {
        hotel: {
          id: 1,
          name: "The Standard, High Line New York",
          address: { lines: ["848 Washington St", "New York, NY 10014"] },
        },
        offers: [
          {
            price: { total: "299", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Standard,+High+Line+NY",
      },
      {
        hotel: {
          id: 2,
          name: "The NoMad Hotel",
          address: { lines: ["1170 Broadway", "New York, NY 10001"] },
        },
        offers: [
          {
            price: { total: "350", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+NoMad+Hotel",
      },
      {
        hotel: {
          id: 3,
          name: "CitizenM New York Times Square",
          address: { lines: ["218 W 50th St", "New York, NY 10019"] },
        },
        offers: [
          {
            price: { total: "249", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=CitizenM+New+York",
      },
      {
        hotel: {
          id: 4,
          name: "The Roosevelt Hotel",
          address: { lines: ["45 E 45th St", "New York, NY 10017"] },
        },
        offers: [
          {
            price: { total: "200", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Roosevelt+Hotel",
      },
      {
        hotel: {
          id: 5,
          name: "W New York - Times Square",
          address: { lines: ["123 Washington St", "New York, NY 10001"] },
        },
        offers: [
          {
            price: { total: "400", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=W+New+York",
      },
      {
        hotel: {
          id: 6,
          name: "InterContinental New York Barclay",
          address: { lines: ["111 E 48th St", "New York, NY 10017"] },
        },
        offers: [
          {
            price: { total: "450", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=InterContinental+NY",
      },
    ],
    LA: [
      {
        hotel: {
          id: 7,
          name: "Hotel Bel-Air",
          address: { lines: ["701 Stone Canyon Rd", "Los Angeles, CA 90077"] },
        },
        offers: [
          {
            price: { total: "700", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=Hotel+Bel-Air",
      },
      {
        hotel: {
          id: 8,
          name: "The Beverly Hills Hotel",
          address: { lines: ["9641 Sunset Blvd", "Beverly Hills, CA 90210"] },
        },
        offers: [
          {
            price: { total: "800", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Beverly+Hills+Hotel",
      },
      {
        hotel: {
          id: 9,
          name: "The Hollywood Roosevelt",
          address: { lines: ["7000 Hollywood Blvd", "Los Angeles, CA 90028"] },
        },
        offers: [
          {
            price: { total: "350", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Hollywood+Roosevelt",
      },
      {
        hotel: {
          id: 10,
          name: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
          address: { lines: ["465 La Cienega Blvd", "Los Angeles, CA 90048"] },
        },
        offers: [
          {
            price: { total: "500", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=SLS+Hotel",
      },
      {
        hotel: {
          id: 11,
          name: "The NoMad Hotel Los Angeles",
          address: { lines: ["649 S Olive St", "Los Angeles, CA 90014"] },
        },
        offers: [
          {
            price: { total: "420", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+NoMad+Hotel+LA",
      },
      {
        hotel: {
          id: 12,
          name: "Kimpton Everly Hotel",
          address: { lines: ["6200 Hollywood Blvd", "Los Angeles, CA 90028"] },
        },
        offers: [
          {
            price: { total: "275", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=Kimpton+Everly+Hotel",
      },
    ],
    CHI: [
      {
        hotel: {
          id: 13,
          name: "The Langham, Chicago",
          address: { lines: ["330 N Wabash Ave", "Chicago, IL 60611"] },
        },
        offers: [
          {
            price: { total: "450", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Langham+Chicago",
      },
      {
        hotel: {
          id: 14,
          name: "The Peninsula Chicago",
          address: { lines: ["108 E Superior St", "Chicago, IL 60611"] },
        },
        offers: [
          {
            price: { total: "600", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Peninsula+Chicago",
      },
      {
        hotel: {
          id: 15,
          name: "The Ritz-Carlton, Chicago",
          address: { lines: ["160 E Pearson St", "Chicago, IL 60611"] },
        },
        offers: [
          {
            price: { total: "500", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=The+Ritz-Carlton+Chicago",
      },
      {
        hotel: {
          id: 16,
          name: "Thompson Chicago",
          address: { lines: ["21 E Bellevue Pl", "Chicago, IL 60611"] },
        },
        offers: [
          {
            price: { total: "350", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=Thompson+Chicago",
      },
      {
        hotel: {
          id: 17,
          name: "The Palmer House Hilton",
          address: { lines: ["17 E Monroe St", "Chicago, IL 60603"] },
        },
        offers: [
          {
            price: { total: "180", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=Palmer+House+Hilton",
      },
      {
        hotel: {
          id: 18,
          name: "Hyatt Regency Chicago",
          address: { lines: ["151 E Wacker Dr", "Chicago, IL 60601"] },
        },
        offers: [
          {
            price: { total: "210", currency: "USD" },
          },
        ],
        image: "https://via.placeholder.com/300x200?text=Hyatt+Regency+Chicago",
      },
    ],
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setHotels(mockHotelsData[event.target.value] || []);
  };

  const handleBookingClick = (hotel) => {
    setSelectedHotel(hotel);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    // Simulate booking process
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(false);
      setSelectedHotel(null);
      setCheckInDate("");
      setCheckOutDate("");
      setAdults(1);
      setErrorMessage("");
      setOpenSnackbar(true);
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Book a Hotel
      </Typography>
      <Select
        value={city}
        onChange={handleCityChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">
          <em>Select a City</em>
        </MenuItem>
        <MenuItem value="NYC">New York City</MenuItem>
        <MenuItem value="LA">Los Angeles</MenuItem>
        <MenuItem value="CHI">Chicago</MenuItem>
      </Select>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.hotel.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <img
                  src={hotel.image}
                  alt={hotel.hotel.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {hotel.hotel.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {hotel.hotel.address.lines.join(", ")}
                  </Typography>
                  <Typography variant="h6">
                    {hotel.offers[0].price.currency} {hotel.offers[0].price.total}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookingClick(hotel)}
                  >
                    <IoBed /> Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Booking Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to book {selectedHotel?.hotel.name}?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Check-in Date"
            type="date"
            fullWidth
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Check-out Date"
            type="date"
            fullWidth
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Number of Adults"
            type="number"
            fullWidth
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            InputProps={{
              inputProps: { min: 1 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={errorMessage ? "error" : "success"} sx={{ width: '100%' }}>
          {errorMessage || "Booking confirmed successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HotelBooking;
