import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { capitalize } from '../utils/typeUtils';

export default function RegisterPokemon() {
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] = useState({
    nome: '',
    tipoPrincipalCodigo: '',
    tipoSecundarioCodigo: '',
  });

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchPokemonTypes() {
      try {
        setLoadingTypes(true);
        const response = await api.get('/tipos');
        setPokemonTypes(response.data);
      } catch (err) {
        console.error('Erro ao buscar tipos de Pokémon:', err);
        setMessage('Erro ao carregar os tipos de Pokémon.');
        setIsSuccess(false);
      } finally {
        setLoadingTypes(false);
      }
    }
    fetchPokemonTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNativeSelectChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value === '' ? '' : String(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const dataToSend = {
        nome: pokemonData.nome,
        tipoPrincipalId: Number(pokemonData.tipoPrincipalCodigo),
      };

      if (pokemonData.tipoSecundarioCodigo) {
        dataToSend.tipoSecundarioId = Number(pokemonData.tipoSecundarioCodigo);
      }

      await api.post('/pokemons', dataToSend);

      setMessage('Pokémon cadastrado com sucesso!');
      setIsSuccess(true);

      setPokemonData({
        nome: '',
        tipoPrincipalCodigo: '',
        tipoSecundarioCodigo: '',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Erro ao cadastrar Pokémon:', err);
      setMessage(
        `Erro ao cadastrar Pokémon: ${err.response?.data?.errors?.fieldErrors?.tipoPrincipalId?.[0] || err.response?.data?.message || err.message || 'Verifique sua conexão e o backend.'}`,
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 p-8 w-full max-w-lg mx-auto my-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Cadastrar Novo Pokémon
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 text-gray-800"
        >
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Pokémon <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={pokemonData.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
              placeholder="Ex: Pikachu"
            />
          </div>

          {/* Tipo Principal -*/}
          <div>
            <label
              htmlFor="tipoPrincipalCodigo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo Principal <span className="text-red-500">*</span>
            </label>
            {loadingTypes ? (
              <p className="mt-1 text-gray-500">Carregando tipos...</p>
            ) : (
              <select
                id="tipoPrincipalCodigo"
                name="tipoPrincipalCodigo"
                value={pokemonData.tipoPrincipalCodigo}
                onChange={handleNativeSelectChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 text-gray-800"
              >
                <option value="" disabled>
                  Selecione um tipo principal
                </option>
                {pokemonTypes.map((type) => (
                  <option key={type.codigo} value={String(type.codigo)}>
                    {capitalize(type.nome)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tipo Secundário (Opcional)*/}
          <div>
            <label
              htmlFor="tipoSecundarioCodigo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo Secundário (Opcional)
            </label>
            {loadingTypes ? (
              <p className="mt-1 text-gray-500">Carregando tipos...</p>
            ) : (
              <select
                id="tipoSecundarioCodigo"
                name="tipoSecundarioCodigo"
                value={pokemonData.tipoSecundarioCodigo}
                onChange={handleNativeSelectChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 text-gray-800"
              >
                <option value="">Nenhum</option>
                {pokemonTypes.map((type) => (
                  <option key={type.codigo} value={String(type.codigo)}>
                    {capitalize(type.nome)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Botão de Cadastrar */}
          <div className="col-span-1 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading || loadingTypes}
              className="bg-gray-800 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="mr-2 text-xl animate-spin">🌀</span>{' '}
                  Cadastrando...
                </>
              ) : (
                <>
                  <span role="img" aria-label="plus" className="mr-2 text-lg">
                    ➕
                  </span>{' '}
                  Cadastrar Pokémon
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-red-500 text-lg transition-colors"
          >
            Voltar para a Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}
