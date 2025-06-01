'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

import Header from '../components/Header';
import PokemonSearch from '../components/PokemonSearch';
import PokemonListItem from '../components/PokemonListItem';
import PokemonDetail from '../components/PokemonDetail';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/pokemons');

        // *** Mapeamento DOS DADOS DA API para o formato esperado pelos componentes ***
        const mappedPokemons = response.data.map((poke) => {
          return {
            id: poke.id, // Mantém o ID original
            codigo: poke.codigo, // Mapeia 'codigo' da API para 'codigo'
            nome: poke.nome, // Mapeia 'nome' da API para 'nome'
            gif: poke.gif || poke.imagem || poke.sprite || '/placeholder.svg', // Mapeia 'gif'
            tipoPrincipal: poke.tipoPrincipal, // Passa o objeto tipoPrincipal
            tipoSecundario: poke.tipoSecundario, // Passa o objeto tipoSecundario
            hp: poke.hp,
            attack: poke.attack,
            defense: poke.defense,
            description: poke.descricao || poke.description,
            // Adiciona outras propriedades necessárias
          };
        });
        // *******************************************************************

        setPokemons(mappedPokemons);
        // Define o primeiro Pokémon como selecionado, se existir
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
      pokemon.nome && // Verifica se pokemon.nome existe
      pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
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
            {/* Componente de busca */}
            <PokemonSearch
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />
            <div className="grid lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2 bg-gray-50 p-6 max-h-[600px] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  {loading ? (
                    <p className="text-center text-gray-600 md:col-span-2">
                      Carregando Pokémons...
                    </p>
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
