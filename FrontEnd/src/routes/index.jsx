import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evento from "../pages/Evento";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<Evento />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
