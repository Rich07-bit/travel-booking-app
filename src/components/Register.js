import React, { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { auth } from "./Firebase"; // Asegúrate de que la ruta sea correcta
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importar la función de Firebase para registro

const Register = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden. Inténtalo de nuevo.",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    try {
      // Intentar registrar al usuario con Firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // Si el registro es exitoso, mostrar un modal de éxito
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada correctamente.",
        confirmButtonColor: "#1976d2",
      }).then(() => {
        // Redirigir a la página de login después de cerrar el modal
        navigate("/login");
      });
    } catch (error) {
      // Mostrar el error de Firebase en un modal
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: `Error al registrar usuario: ${error.message}`,
        confirmButtonColor: "#1976d2",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 6,
        background: "linear-gradient(135deg, #6DD5FA 0%, #061e4d 100%)",
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        width: "80%",
        maxWidth: 500,
        margin: 5,
        position: "relative",
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginBottom: 3 }}>
          Crear una Cuenta
        </Typography>
      </motion.div>

      <Divider sx={{ width: "80%", marginBottom: 3 }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: "10px",
              },
            }}
          />
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
          <TextField
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Registrarse
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
        <Typography variant="body1" sx={{ color: "white" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate("/login")} // Navegar a Login
          >
            Inicia sesión
          </span>
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Register;
