// src/pages/ManageTypes.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { capitalize } from '../utils/typeUtils';
import Spinner from '../components/Spinner';

export default function ManageTypes() {
  const [typeName, setTypeName] = useState('');
  const [types, setTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Função para buscar todos os tipos
  const fetchTypes = async () => {
    try {
      setLoadingTypes(true);
      const response = await api.get('/tipos');
      // Garante que os tipos são ordenados pelo nome
      const sortedTypes = response.data.sort((a, b) =>
        a.nome.localeCompare(b.nome),
      );
      setTypes(sortedTypes);
    } catch (err) {
      console.error('Erro ao buscar tipos:', err);
      setMessage('Erro ao carregar a lista de tipos.');
      setIsSuccess(false);
    } finally {
      setLoadingTypes(false);
    }
  };

  // Carrega os tipos na montagem do componente
  useEffect(() => {
    fetchTypes();
  }, []);

  const handleInputChange = (e) => {
    setTypeName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      if (editingType) {
        const dataToSend = { nome: typeName };
        // Endpoint PUT: /tipos/:codigo
        await api.put(`/tipos/${editingType.codigo}`, dataToSend);
        setMessage(`Tipo "${typeName}" atualizado com sucesso!`);
      } else {
        // Modo de Cadastro
        const dataToSend = { nome: typeName };
        // Endpoint POST: /tipos
        await api.post('/tipos', dataToSend);
        setMessage(`Tipo "${typeName}" cadastrado com sucesso!`);
      }
      setIsSuccess(true);

      // Limpar formulário e estado de edição
      setTypeName('');
      setEditingType(null);

      // Re-carregar a lista de tipos para refletir a mudança
      await fetchTypes();
    } catch (err) {
      console.error('Erro ao salvar tipo:', err);
      setMessage(
        `Erro ao salvar tipo: ${err.response?.data?.message || err.message || 'Verifique sua conexão e o backend.'}`,
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (type) => {
    setEditingType(type); // Define o tipo que será editado
    setTypeName(type.nome); // Preenche o input com o nome do tipo
    setMessage(''); // Limpa mensagens anteriores
  };

  const handleCancelEdit = () => {
    setEditingType(null); // Cancela o modo de edição
    setTypeName(''); // Limpa o input
    setMessage(''); // Limpa mensagens
  };

  const handleDelete = async (typeToDelete) => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o tipo "${typeToDelete.nome}"?`,
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      // Endpoint DELETE: /tipos/:codigo
      await api.delete(`/tipos/${typeToDelete.codigo}`);
      setMessage(`Tipo "${typeToDelete.nome}" excluído com sucesso!`);
      setIsSuccess(true);

      // Se o tipo excluído era o que estava sendo editado, cancelar edição
      if (editingType && editingType.codigo === typeToDelete.codigo) {
        setEditingType(null);
        setTypeName('');
      }

      // Re-carregar a lista de tipos
      await fetchTypes();
    } catch (err) {
      console.error('Erro ao excluir tipo:', err);
      setMessage(
        `Erro ao excluir tipo: ${err.response?.data?.message || err.message || 'Não foi possível excluir. Verifique se há Pokémons associados a este tipo.'}`,
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white flex flex-col items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 w-full max-w-4xl mx-auto my-8 p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          {editingType
            ? `Editar Tipo: ${editingType.nome}`
            : 'Gerenciar Tipos de Pokémon'}
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message}
          </div>
        )}

        {/* Formulário de Cadastro/Edição */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 text-gray-800 border-b-2 border-gray-300 pb-6 mb-6"
        >
          <div>
            <label
              htmlFor="typeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Tipo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="typeName"
              name="typeName"
              value={typeName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
              placeholder="Ex: Water, Electric, Fairy"
            />
          </div>

          <div className="col-span-1 flex justify-center gap-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="mr-2 text-xl animate-spin">🌀</span>{' '}
                  Salvando...
                </>
              ) : (
                <>
                  <span role="img" aria-label="save" className="mr-2 text-lg">
                    💾
                  </span>{' '}
                  {editingType ? 'Salvar Edição' : 'Cadastrar Tipo'}
                </>
              )}
            </button>
            {editingType && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span role="img" aria-label="cancel" className="mr-2 text-lg">
                  ❌
                </span>{' '}
                Cancelar Edição
              </button>
            )}
          </div>
        </form>

        {/* Lista de Tipos Existentes */}
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Tipos Cadastrados
        </h2>
        {loadingTypes ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-600">
            <p className="mb-4 text-lg">Carregando tipos...</p>
            <Spinner />
          </div>
        ) : types.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum tipo cadastrado ainda.
          </p>
        ) : (
          <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-inner">
            <ul className="divide-y divide-gray-200">
              {types.map((type) => (
                <li
                  key={type.codigo}
                  className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 text-gray-800 transition-colors"
                >
                  <span className="text-lg font-medium">
                    <span className="text-gray-500 mr-2">
                      #{String(type.codigo).padStart(3, '0')}
                    </span>
                    {capitalize(type.nome)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(type)}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(type)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

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
