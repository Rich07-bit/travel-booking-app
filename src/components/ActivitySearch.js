import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import PaymentModule from "./Payment";

const ActivitySearch = () => {
  const [activityDate, setActivityDate] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const sampleActivities = [
    {
      id: 1,
      name: "Excursión a la Estatua de la Libertad",
      location: "Nueva York",
      price: { amount: "50.00", currency: "USD" },
      imageUrl: "https://4.bp.blogspot.com/-3-iZryHikBc/UT-1kJ85API/AAAAAAAAQbM/QR93MB6bNIE/s1600/estatua-de-la-libertad.jpg",
    },
    {
      id: 2,
      name: "Tour por el Empire State",
      location: "Nueva York",
      price: { amount: "30.00", currency: "USD" },
      imageUrl: "https://th.bing.com/th?id=OLC.MjjHi+UL3lIbfA480x360&rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Paseo en Barco por el Río Hudson",
      location: "Nueva York",
      price: { amount: "45.00", currency: "USD" },
      imageUrl: "https://th.bing.com/th/id/OIP.FR3LSbAPkVmBcZ56QkNcggHaEs?w=1024&h=649&rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      name: "Visita al Museo de Arte Moderno (MoMA)",
      location: "Nueva York",
      price: { amount: "25.00", currency: "USD" },
      imageUrl: "https://th.bing.com/th?id=OLC.eMWnVoA8kj//gQ480x360&rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      name: "Tour en Bicicleta por Central Park",
      location: "Nueva York",
      price: { amount: "35.00", currency: "USD" },
      imageUrl: "https://cdn.atrapalo.com/common/photo/event/4/8/5/0413/1145005/vertic_880_0.jpg",
    },
    {
      id: 6,
      name: "Tour Histórico por Wall Street",
      location: "Nueva York",
      price: { amount: "40.00", currency: "USD" },
      imageUrl: "https://assets.editorial.aetnd.com/uploads/2019/01/topic_wallstreet-926069614.jpg",
    },
    {
      id: 7,
      name: "Recorrido por el Memorial del 9/11",
      location: "Nueva York",
      price: { amount: "20.00", currency: "USD" },
      imageUrl: "https://th.bing.com/th/id/OIP.q5JHxWaUoTm7hoohMFxLtwHaFj?rs=1&pid=ImgDetMain",
    },
    {
      id: 8,
      name: "Experiencia Gastronómica en Brooklyn",
      location: "Nueva York",
      price: { amount: "60.00", currency: "USD" },
      imageUrl: "https://th.bing.com/th/id/OIP.VSKfhBQWMzLkw9pYrgyL2QHaFj?w=640&h=480&rs=1&pid=ImgDetMain",
    },
    {
      id: 9,
      name: "Espectáculo de Broadway",
      location: "Nueva York",
      price: { amount: "100.00", currency: "USD" },
      imageUrl: "https://directorioturistico.net/wp-content/uploads/2013/05/Broadway.jpg",
    },
    {
      id: 10,
      name: "Tour Nocturno por Times Square",
      location: "Nueva York",
      price: { amount: "25.00", currency: "USD" },
      imageUrl: "https://cdn2.civitatis.com/estados-unidos/nueva-york/galeria/big/time-square-noche.jpg",
    },
    {
      id: 11,
      name: "Excursión al Coliseo",
      location: "Roma",
      price: { amount: "70.00", currency: "EUR" },
      imageUrl: "https://th.bing.com/th/id/OIP.b3gYYphuaw3kewrzxKReBgHaFI?rs=1&pid=ImgDetMain",
    },
    {
      id: 12,
      name: "Tour por el Vaticano",
      location: "Roma",
      price: { amount: "80.00", currency: "EUR" },
      imageUrl: "https://ramsus80.sirv.com/WP_www.vaticanmuseumstour.com/2016/10/square_speter.jpg",
    },
    {
      id: 13,
      name: "Paseo en Góndola",
      location: "Venecia",
      price: { amount: "90.00", currency: "EUR" },
      imageUrl: "https://th.bing.com/th/id/OIP.ZKqFPl-1kEcLHI04sy9i7AHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 14,
      name: "Visita al Louvre",
      location: "París",
      price: { amount: "60.00", currency: "EUR" },
      imageUrl: "https://fthmb.tqn.com/Qbn95F8HLqnZp9t_prpW7pcf5iw=/960x0/filters:no_upscale()/LouvresengchyeteoGettyImages-5a14669aaad52b00370c599e.jpg",
    },
    {
      id: 15,
      name: "Recorrido por la Torre Eiffel",
      location: "París",
      price: { amount: "30.00", currency: "EUR" },
      imageUrl: "https://th.bing.com/th/id/OIP.QDNBJy2C1jdrzFVC6IyoBwHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
    },
    {
      id: 16,
      name: "Safari en el Desierto",
      location: "Dubai",
      price: { amount: "120.00", currency: "AED" },
      imageUrl: "https://www.101viajes.com/sites/default/files/styles/guia-full/public/atardecer-safari.desierto-dubai_0.jpg",
    },
    {
      id: 17,
      name: "Visita al Burj Khalifa",
      location: "Dubai",
      price: { amount: "100.00", currency: "AED" },
      imageUrl: "https://th.bing.com/th/id/OIP.0G2DCM-z1Iq8jLoUa8_KDwHaE8?w=1920&h=1280&rs=1&pid=ImgDetMain",
    },
    {
      id: 18,
      name: "Tour en el Gran Cañón",
      location: "Arizona",
      price: { amount: "150.00", currency: "USD" },
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500",
    },
    {
      id: 19,
      name: "Excursión en Table Mountain",
      location: "Cape Town",
      price: { amount: "110.00", currency: "ZAR" },
      imageUrl: "https://www.capetown.travel/wp-content/uploads/2022/07/Table-Mountain-Camps-Bay.jpg"
    },
    {
      id: 20,
      name: "Tour a la Ópera de Sídney",
      location: "Sídney",
      price: { amount: "90.00", currency: "AUD" },
      imageUrl: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=500",
    },
];

  const searchActivities = () => {
    if (!activityDate) {
      setErrorMessage("Por favor, ingrese la fecha.");
      setOpenSnackbar(true);
      return;
    }

    setFilteredActivities(sampleActivities);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setNumberOfPeople(1);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedActivity(null);
  };

  const handleReserveActivity = () => {
    if (selectedActivity) {
      handleDialogClose();

      Swal.fire({
        title: "Confirmación de la actividad",
        text: `Ha reservado para ${numberOfPeople} personas, la actividad ${selectedActivity.name}.`,
        icon: "question",
        confirmButtonText: "Sí, proceder al pago",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setPaymentDialogOpen(true);
        }
      });
    }
  };

  const handlePaymentSuccess = () => {
    Swal.fire({
      title: "Pago exitoso",
      text: "Tu pago ha sido procesado con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    setPaymentDialogOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Búsqueda de Actividades
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Fecha de Actividad"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setActivityDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={searchActivities}
              sx={{
                width: "100%",
                backgroundColor: "#007bff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Buscar Actividades
            </Button>
          </Grid>
        </Grid>

        {filteredActivities.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" align="center">
              Resultados de Actividades
            </Typography>
            <Box
              sx={{
                paddingTop: 4,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "16px",
                justifyItems: "center",
              }}
            >
              {filteredActivities.map((activity) => (
                <Card
                  key={activity.id}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={activity.imageUrl}
                    alt={activity.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                    sx={{ height: 140 }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
                      {activity.name}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Ubicación: {activity.location}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Fecha: {activityDate}
                    </Typography>
                    <Typography variant="body2" align="center">
                      Precio: {activity.price.amount} {activity.price.currency}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleActivityClick(activity)}
                      sx={{ mt: 2 }}
                    >
                      Reservar
                    </Button>
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

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Detalles de la Actividad</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedActivity && (
                <div>
                  <Typography>Actividad: {selectedActivity.name}</Typography>
                  <Typography>Ubicación: {selectedActivity.location}</Typography>
                  <Typography>Fecha: {activityDate}</Typography>
                  <TextField
                    label="Número de Personas"
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    inputProps={{ min: 1 }}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleReserveActivity} color="primary">
              Reservar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)}>
          <DialogTitle>Confirmar Pago</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Deseas confirmar el pago para la actividad seleccionada?
            </DialogContentText>
            <PaymentModule onPaymentSuccess={handlePaymentSuccess} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentDialogOpen(false)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default ActivitySearch;
