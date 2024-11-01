import React from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 
import { signOut } from "firebase/auth"; 
import { auth } from "./Firebase"; 
import Swal from "sweetalert2"; 

const Header = () => {
  const { userName, setUserName } = useUser(); 
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth); // Cerrar sesión en Firebase
        setUserName(null); // Limpiar el nombre de usuario en el contexto
        Swal.fire('Cerrado!', 'Has cerrado sesión.', 'success'); // Mensaje de éxito
        navigate("/"); // Redirigir a la página principal
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
        Swal.fire('Error', 'No se pudo cerrar la sesión.', 'error'); // Mensaje de error
      }
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e2a38" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plataforma de reservas de Vuelos, Hoteles y Actividades
        </Typography>
        <Tabs
          textColor="inherit"
          indicatorColor="secondary"
          value={location.pathname}
        >
          <Tab
            component={Link}
            to="/"
            label="Vuelos"
            value="/"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
            }}
          />
          <Tab
            component={Link}
            to="/hotels"
            label="Hoteles"
            value="/hotels"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
            }}
          />
          <Tab
            component={Link}
            to="/activities"
            label="Actividades"
            value="/activities"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "darkblue",
                color: "#fff",
              },
            }}
          />
        </Tabs>
        {/* Mostrar el nombre de usuario si está logueado */}
        {userName ? (
          <>
            <Typography variant="body1" sx={{ color: "white", marginRight: 2 }}>
              Bienvenido, {userName}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
