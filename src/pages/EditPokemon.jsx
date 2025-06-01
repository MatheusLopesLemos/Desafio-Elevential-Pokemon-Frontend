import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import Spinner from '../components/Spinner';
import { capitalize } from '../utils/typeUtils';

export default function EditPokemon() {
  const { id: pokemonCode } = useParams();
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchPokemonAndTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        const pokemonResponse = await api.get(`/pokemons/${pokemonCode}`);
        const fetchedPokemon = pokemonResponse.data;

        console.log('Dados do Pokémon recebidos:', fetchedPokemon);

        setPokemonData({
          id: fetchedPokemon.id || '',
          codigo: fetchedPokemon.codigo?.toString() || '',
          nome: fetchedPokemon.nome || '',
          tipoPrincipalId:
            fetchedPokemon.tipoPrincipal?.codigo?.toString() || '',
          tipoSecundarioId:
            fetchedPokemon.tipoSecundario?.codigo?.toString() || '',
        });

        const tiposResponse = await api.get('/tipos');
        setTipos(tiposResponse.data);
      } catch (err) {
        console.error(
          'Erro ao carregar dados para edição:',
          err.response?.data || err.message || err,
        );
        setError(
          err.response?.data?.message ||
            'Não foi possível carregar os dados do Pokémon ou tipos. Ele pode não existir ou há um erro na API.',
        );
      } finally {
        setLoading(false);
      }
    };

    if (pokemonCode) {
      fetchPokemonAndTypes();
    } else {
      setLoading(false);
      setError('Código do Pokémon não informado na URL.');
    }
  }, [pokemonCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToUpdate = {
        id: pokemonData.id,
        codigo: Number(pokemonData.codigo),
        nome: pokemonData.nome,
        tipoPrincipalId: Number(pokemonData.tipoPrincipalId),
        tipoSecundarioId: pokemonData.tipoSecundarioId
          ? Number(pokemonData.tipoSecundarioId)
          : null,
      };

      await api.put(`/pokemons/${pokemonCode}`, dataToUpdate);

      alert(
        `Pokémon "${capitalize(pokemonData.nome)}" (Código: ${pokemonData.codigo}) atualizado com sucesso!`,
      );
      navigate('/');
    } catch (err) {
      console.error(
        'Erro ao atualizar Pokémon:',
        err.response?.data || err.message || err,
      );
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.fieldErrors?.tipoPrincipalId?.[0] ||
        'Ocorreu um erro ao tentar atualizar o Pokémon.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <Spinner />
      </div>
    );
  }

  if (error || !pokemonData) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-700 rounded-lg shadow-xl p-8 text-center">
          <p className="text-xl font-semibold mb-4">
            {error || 'Pokémon não encontrado para edição.'}
          </p>
          <Link to="/" className="text-blue-200 hover:underline">
            Voltar para a Pokédex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-2xl border border-green-400">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Editar Pokémon: {capitalize(pokemonData.nome)}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="codigo"
              className="block text-green-300 text-sm font-bold mb-2"
            >
              Código:
            </label>
            <input
              type="number"
              id="codigo"
              name="codigo"
              value={pokemonData.codigo}
              onChange={handleChange}
              placeholder="Código do Pokémon"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="nome"
              className="block text-green-300 text-sm font-bold mb-2"
            >
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={pokemonData.nome}
              onChange={handleChange}
              placeholder="Nome do Pokémon"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="tipoPrincipalId"
              className="block text-green-300 text-sm font-bold mb-2"
            >
              Tipo Principal:
            </label>
            <select
              id="tipoPrincipalId"
              name="tipoPrincipalId"
              value={pokemonData.tipoPrincipalId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione o tipo principal</option>
              {tipos.map((tipo) => (
                <option key={tipo.codigo} value={tipo.codigo}>
                  {capitalize(tipo.nome)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="tipoSecundarioId"
              className="block text-green-300 text-sm font-bold mb-2"
            >
              Tipo Secundário (Opcional):
            </label>
            <select
              id="tipoSecundarioId"
              name="tipoSecundarioId"
              value={pokemonData.tipoSecundarioId}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Nenhum</option>
              {tipos.map((tipo) => (
                <option key={tipo.codigo} value={tipo.codigo}>
                  {capitalize(tipo.nome)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded bg-red-100 text-red-700 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
