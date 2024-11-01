import React, { useState } from "react";
import { Box, Button, TextField, Typography, Divider, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase"; 
import Swal from "sweetalert2";
import { useUser } from "./UserContext";

const Login = () => {
  const { setUserName } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Establecer el nombre de usuario solo después de un inicio de sesión exitoso
      const userDisplayName = email.split("@")[0]; 
      setUserName(userDisplayName); // Establecer el nombre de usuario en el contexto

      Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
      navigate("/"); // Redirigir a la pestaña de vuelos
    } catch (error) {
      let errorMessage;

      // Manejo de errores específicos
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No hay ningún usuario registrado con este correo.";
          break;
        case 'auth/wrong-password':
          errorMessage = "La contraseña es incorrecta.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El correo electrónico no es válido.";
          break;
        default:
          errorMessage = "Error al iniciar sesión: " + error.message;
      }

      Swal.fire("Error", errorMessage, "error");
      setError(errorMessage);
    }
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      borderRadius: 6,
      background: "linear-gradient(135deg, #6DD5FA 0%, #061e4d 100%)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      width: "200%",
      maxWidth: 650,
      margin: 12,
      position: "relative",
    }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginBottom: 3 }}>
          Iniciar Sesión
        </Typography>
      </motion.div>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <Divider sx={{ width: "80%", marginBottom: 3 }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: "10px",
              },
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "12px 0",
                borderRadius: "30px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                transition: "all 0.3s ease",
              }}
            >
              Iniciar Sesión
            </Button>
          </motion.div>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ marginTop: "20px" }}
      >
        <Typography variant="body1" sx={{ color: "black" }}>
          ¿No tienes una cuenta?{" "}
          <span onClick={handleRegisterClick} style={{ color: "white", cursor: "pointer" }}>
            Regístrate
          </span>
        </Typography>
        <Grid container>
          <Grid item xs>
            <Button href="#" variant="text" color="secondary">
              ¿Olvidaste tu contraseña?
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Login;
