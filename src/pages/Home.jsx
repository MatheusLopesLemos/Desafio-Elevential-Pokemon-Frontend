import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PokemonSearch from '../components/PokemonSearch';
import PokemonListItem from '../components/PokemonListItem';
import PokemonDetail from '../components/PokemonDetail';
import Spinner from '../components/Spinner';
import { typeColors, capitalize } from '../utils/typeUtils';
import { Select, SelectItem } from '@/components/ui/select';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allPokemonTypes = ['all', ...Object.keys(typeColors)];

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/pokemons');

        const mappedPokemons = response.data.map((poke) => {
          return {
            id: poke.id,
            codigo: poke.codigo,
            nome: poke.nome,
            gif: poke.gif || poke.imagem || poke.sprite || '/placeholder.svg',
            tipoPrincipal: poke.tipoPrincipal,
            tipoSecundario: poke.tipoSecundario,
            hp: poke.hp,
            attack: poke.attack,
            defense: poke.defense,
            description: poke.descricao || poke.description,
          };
        });

        setPokemons(mappedPokemons);
        if (mappedPokemons.length > 0) {
          setSelectedPokemon(mappedPokemons[0]);
        }
      } catch (err) {
        console.error('Erro ao buscar pokémons:', err);
        setError(
          'Erro ao carregar os Pokémons. Verifique se o backend está rodando e a estrutura dos dados.',
        );
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  const filteredPokemon = pokemons.filter(
    (pokemon) =>
      pokemon &&
      pokemon.nome &&
      pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === 'all' ||
        (pokemon.tipoPrincipal &&
          pokemon.tipoPrincipal.nome &&
          pokemon.tipoPrincipal.nome.toLowerCase() ===
            selectedType.toLowerCase()) ||
        (pokemon.tipoSecundario &&
          pokemon.tipoSecundario.nome &&
          pokemon.tipoSecundario.nome.toLowerCase() ===
            selectedType.toLowerCase())),
  );

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            POKÉDEX
          </h1>
          <p className="text-red-100 text-lg">
            Digital Encyclopedia of Pokémon
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800">
            <Header totalEntries={pokemons.length} />{' '}
            <div className="bg-gray-100 p-6 border-b-4 border-gray-300 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-wrap">
              <div className="flex flex-col sm:flex-row items-center gap-4 flex-grow justify-center md:justify-start">
                <div className="flex-grow max-w-md">
                  <PokemonSearch
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                  />
                </div>
                <div className="flex-shrink-0 w-auto min-w-[180px]">
                  <Select value={selectedType} onChange={handleTypeChange}>
                    {allPokemonTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {capitalize(type === 'all' ? 'Todos os Tipos' : type)}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <Link
                  to="/register"
                  className="bg-gray-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-base transition-colors shadow-md flex items-center whitespace-nowrap"
                >
                  <span role="img" aria-label="plus" className="mr-2 text-lg">
                    ➕
                  </span>{' '}
                  Cadastrar
                </Link>
              </div>
            </div>{' '}
            {/* Fim do container de busca, filtro e botão */}
            <div className="grid lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2 bg-gray-50 p-6 max-h-[600px] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  {loading ? (
                    <div className="md:col-span-2 flex flex-col items-center justify-center py-8">
                      {' '}
                      {/* Container para centralizar ambos */}
                      <p className="text-center text-gray-600 mb-4 text-lg">
                        Carregando Pokémons...
                      </p>
                      <Spinner />
                    </div>
                  ) : error ? (
                    <p className="text-center text-red-500 md:col-span-2">
                      {error}
                    </p>
                  ) : filteredPokemon.length === 0 ? (
                    <p className="text-center text-gray-600 md:col-span-2">
                      Nenhum Pokémon encontrado.
                    </p>
                  ) : (
                    filteredPokemon.map((pokemon) => (
                      <PokemonListItem
                        key={pokemon.id}
                        pokemon={pokemon}
                        isSelected={
                          selectedPokemon && selectedPokemon.id === pokemon.id
                        }
                        onClick={handlePokemonClick}
                      />
                    ))
                  )}
                </div>
              </div>

              <PokemonDetail pokemon={selectedPokemon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
