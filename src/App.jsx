// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import RegisterPokemon from './pages/RegisterPokemon';
import ManageTypes from './pages/ManageTypes'; // <-- Importação e nome do componente atualizados

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-pokemon" element={<RegisterPokemon />} />
        {/* A rota permanece a mesma para não precisar mudar links existentes */}
        <Route path="/register-type" element={<ManageTypes />} />{' '}
        {/* <-- Rota atualizada para o novo componente */}
        {/* Adicione outras rotas aqui conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}
