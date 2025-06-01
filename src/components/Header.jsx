// src/components/PokedexHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';

function Header({ totalEntries }) {
  return (
    <div className="bg-red-600 p-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-red-400 rounded-full border-2 border-white"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
            <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
        <div className="text-white font-mono text-sm">
          Total de Pokemons: {totalEntries}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  totalEntries: PropTypes.number.isRequired,
};

export default Header;
