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
import payment from './Payment'
import Swal from "sweetalert2";
import { Payment } from "@mui/icons-material";

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
        image: "https://www.travelplusstyle.com/wp-content/gallery/the-standard-new-york/top-of-the-standard-lounge.jpg",
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
        image: "https://www.sherry.wine/media/images/the_nomad_eater-1011.width-1000.jpg",
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
        image: "https://www.es.kayak.com/rimg/himg/b2/41/40/leonardo-1313710-New_York_Times_Square-cloudM-CitizenM_NYT-061_high_O-356036.jpg?width=1366&height=768&crop=true",
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
        image: "https://th.bing.com/th/id/OIP.3zCYJVaKJh2kZli8f9cEBwHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain",
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
        image: "https://thepointsguy.global.ssl.fastly.net/us/originals/2019/02/W-Times-Square-NY_ERosen-15.jpg",
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
        image: "https://pix10.agoda.net/hotelImages/734/7346/7346_14041809510019119957.jpg?s=1024x768",
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
        image: "https://static01.nyt.com/images/2013/05/26/travel/26CHECKIN1_SPAN/26CHECKIN1_SPAN-master1050-v2.jpg",
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
        image: "https://www.tripsavvy.com/thmb/p6GdX09AqWlc80M2-RczIGNgr-0=/5354x3569/filters:no_upscale():max_bytes(150000):strip_icc()/10467348213_a095ca7b2a_o-56a10ee03df78cafdaa8d7f6.jpg",
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
        image: "https://www.fiftygrande.com/wp-content/uploads/2022/04/Hotel-Roosevelt-Hero.jpg",
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
        image: "https://cache.marriott.com/marriottassets/marriott/LAXLS/laxls-hotel-3265-hor-wide.jpg?interpolation=progressive-bilinear&downsize=1440px:*",
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
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/45/34/f5/pool.jpg?w=900&h=-1&s=1",
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
        image: "https://th.bing.com/th/id/OIP.q7fq9YinXcIDPXOD_3OeJQHaJ4?rs=1&pid=ImgDetMain",
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
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/45/2f/5f/exterior.jpg?w=900&h=-1&s=1",
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
        image: "https://th.bing.com/th/id/OIP.C9_H_0H6ZSVpxnFsPNiR-AHaFm?w=1200&h=908&rs=1&pid=ImgDetMain",
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
        image: "https://moneyinc.com/wp-content/uploads/2016/09/Ritz-Carlton-Chicago.jpg",
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
        image: "https://abcnews.go.com/images/Lifestyle/HT_thompson_chicago_hotel_entrance_1_jt_151002_3x2_1600.jpg",
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
        image: "https://www.palmerhousehiltonhotel.com/images/2013/10/Palmer-house-lobby-final-larger-e1380753290284-700x344.jpg",
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
        image: "https://cdn.choosechicago.com/uploads/2019/08/Exterior-hyatt-2400x1600.jpg",
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
