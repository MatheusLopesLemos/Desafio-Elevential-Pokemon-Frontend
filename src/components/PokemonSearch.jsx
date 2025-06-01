import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function PokemonSearch({ searchTerm, onSearchTermChange }) {
  return (
    <div className="bg-gray-100 p-6 border-b-4 border-gray-300">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-red-500"
        />
      </div>
    </div>
  );
}

PokemonSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default PokemonSearch;
