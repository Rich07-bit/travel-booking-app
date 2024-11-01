import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Mainlayout";
import FlightSearch from "./components/FlightSearch";
import HotelSearch from "./components/HotelBooking";
import ActivitySearch from "./components/ActivitySearch";
import Register from "./components/Register";
import Login from "./components/Login";
import { UserProvider } from "./components/UserContext";
import './App.css';

function App() {
  const [category, setCategory] = useState('flights'); 

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleActivitySelected = (activity) => {
    console.log("Actividad seleccionada:", activity);
    // Aquí puedes manejar la actividad seleccionada como necesites
  };

  return (
    <UserProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route 
              path="/" 
              element={<FlightSearch onCategoryChange={() => handleCategoryChange('flights')} />} 
            />
            <Route 
              path="/hotels" 
              element={<HotelSearch onCategoryChange={() => handleCategoryChange('hotels')} />} 
            />
            <Route 
              path="/activities" 
              element={
                <ActivitySearch 
                  onCategoryChange={() => handleCategoryChange('activities')} 
                  onActivitySelected={handleActivitySelected} // Pasa la función aquí
                />} 
            />
            <Route 
              path="/Login" 
              element={<Login onCategoryChange={() => handleCategoryChange('Login')} />} 
            />
            <Route 
              path="/Register" 
              element={<Register onCategoryChange={() => handleCategoryChange('Register')} />} 
            />
          </Routes>
          {/* <ImageGallery category={category} /> Pasar la categoría a la galería */}
        </MainLayout>
      </Router>
    </UserProvider>
  );
}

export default App;
