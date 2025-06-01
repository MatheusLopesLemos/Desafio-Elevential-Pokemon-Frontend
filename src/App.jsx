import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import RegisterPokemon from './pages/RegisterPokemon';
import ManageTypes from './pages/ManageTypes';
import EditPokemonPage from './pages/EditPokemon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-pokemon" element={<RegisterPokemon />} />
        <Route path="/register-type" element={<ManageTypes />} />
        <Route path="/edit-pokemon/:id" element={<EditPokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
