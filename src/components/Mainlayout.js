import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        {children}  {/* Aquí se renderizará el contenido de las rutas */}
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
