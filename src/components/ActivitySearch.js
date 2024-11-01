import React, { useState, useEffect } from "react";
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
import axios from "axios";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const ActivitySearch = ({ onActivitySelected }) => {
  const [activityDate, setActivityDate] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const apiKey = process.env.REACT_APP_AMADEUS_API_KEY;
  const secret = process.env.REACT_APP_AMADEUS_API_SECRET;

  const getAccessToken = async () => {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", apiKey);
    data.append("client_secret", secret);

    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error.response.data);
      setErrorMessage("Error al obtener el token de acceso");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const getRandomPrice = () => {
    return {
      amount: (Math.random() * (100 - 20) + 20).toFixed(2),
      currency: "USD",
    };
  };

  const searchActivities = async () => {
    if (!accessToken) {
      setErrorMessage("No se pudo obtener el token de acceso");
      setOpenSnackbar(true);
      return;
    }

    if (!activityDate) {
      setErrorMessage("Por favor, ingrese la fecha.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/shopping/activities",
        {
          params: {
            startDate: activityDate,
            latitude: 40.7128,
            longitude: -74.0060,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.data && response.data.data.length > 0) {
        const activitiesWithImages = response.data.data.map((activity) => ({
          ...activity,
          price: getRandomPrice(),
          imageUrl: activity.pictures ? activity.pictures[0] : "https://via.placeholder.com/150",
        }));

        setFilteredActivities(activitiesWithImages);
      } else {
        setErrorMessage("No se encontraron actividades.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error al buscar actividades:", error.response?.data || error.message);
      setErrorMessage("Error al buscar actividades");
      setOpenSnackbar(true);
    }
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setNumberOfPeople(1);  // Restablecemos el número de personas
    setOpenDialog(false);  // Abrimos el diálogo
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedActivity(null);
  };

  const handleReserveActivity = () => {
    if (selectedActivity) {
      Swal.fire({
        title: "Confirmación de la actividad",
        text: `Ha reservado para ${numberOfPeople} personas, la actividad ${selectedActivity.name}.`,
        icon: "question",
        confirmButtonText: "Sí, enviar confirmación",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          onActivitySelected({ ...selectedActivity, numberOfPeople });
          handleDialogClose(); // Cerramos el diálogo después de reservar
          Swal.fire({
            title: "Reservado",
            text: "La actividad ha sido confirmada con éxito.",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
        }
      });
    }
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
                  onClick={() => handleActivityClick(activity)}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "16px",
                    cursor: "pointer",
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
                  <Typography>
                    Precio: {selectedActivity.price.amount} {selectedActivity.price.currency}
                  </Typography>
                  <TextField
                    label="Número de Personas"
                    type="number"
                    fullWidth
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
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
      </Box>
    </motion.div>
  );
};

ActivitySearch.propTypes = {
  onActivitySelected: PropTypes.func.isRequired,
};

export default ActivitySearch;
