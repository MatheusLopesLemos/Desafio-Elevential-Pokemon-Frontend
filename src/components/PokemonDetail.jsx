import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@/components/ui/badge';
import { getTipoColor, getTipoIcon, capitalize } from '../utils/typeUtils';

function PokemonDetail({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="lg:col-span-1 bg-gray-900 text-white p-6 flex items-center justify-center h-full">
        <p className="text-green-300 text-lg">
          Selecione um Pokémon para ver os detalhes.
        </p>
      </div>
    );
  }

  const TipoPrincipalIcon = getTipoIcon(pokemon.tipoPrincipal?.nome);
  const TipoSecundarioIcon = pokemon.tipoSecundario?.nome
    ? getTipoIcon(pokemon.tipoSecundario.nome)
    : null;

  return (
    <div className="lg:col-span-1 bg-gray-900 text-white p-6 max-h-[600px] overflow-y-auto">
      <div className="bg-green-400 p-1 rounded-lg mb-6">
        <div className="bg-gray-900 rounded p-6">
          <div className="text-center mb-4">
            <img
              src={pokemon.gif || '/placeholder.svg'}
              alt={pokemon.nome}
              className="w-32 h-32 mx-auto object-contain rounded-lg bg-gray-700 mb-4"
            />
            <h2 className="text-2xl font-bold text-green-400 mb-1">
              {capitalize(pokemon.nome)}
            </h2>
            <p className="text-green-300 text-sm font-mono">
              #{pokemon.codigo?.toString().padStart(3, '0')}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-green-400 font-bold mb-2">TIPO</h3>
              <div className="flex gap-2">
                <Badge
                  className={`${getTipoColor(pokemon.tipoPrincipal?.nome)} text-white flex items-center gap-1`}
                >
                  {TipoPrincipalIcon && (
                    <TipoPrincipalIcon className="w-3 h-3" />
                  )}
                  {capitalize(pokemon.tipoPrincipal?.nome || 'Desconhecido')}
                </Badge>
                {pokemon.tipoSecundario && pokemon.tipoSecundario.nome && (
                  <Badge
                    className={`${getTipoColor(pokemon.tipoSecundario.nome)} text-white flex items-center gap-1`}
                  >
                    {TipoSecundarioIcon && (
                      <TipoSecundarioIcon className="w-3 h-3" />
                    )}
                    {capitalize(pokemon.tipoSecundario.nome)}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-green-400 font-bold mb-2">STATS</h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span>HP:</span>
                  <span className="text-green-300">{pokemon.hp}</span>
                </div>
                <div className="flex justify-between">
                  <span>ATK:</span>
                  <span className="text-green-300">{pokemon.attack}</span>
                </div>
                <div className="flex justify-between">
                  <span>DEF:</span>
                  <span className="text-green-300">{pokemon.defense}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-green-400 font-bold mb-2">DATA</h3>
              <p className="text-green-100 text-sm leading-relaxed">
                {pokemon.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          <span role="img" aria-label="X">
            ❌
          </span>{' '}
          <span className="ml-2">Excluir</span>
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          <span role="img" aria-label="lápis">
            ✏️
          </span>{' '}
          <span className="ml-2">Editar</span>
        </button>
      </div>
    </div>
  );
}

PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codigo: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    gif: PropTypes.string,
    tipoPrincipal: PropTypes.shape({
      nome: PropTypes.string.isRequired,
    }).isRequired,
    tipoSecundario: PropTypes.shape({
      nome: PropTypes.string.isRequired,
    }),
    hp: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number,
    description: PropTypes.string,
  }),
};

PokemonDetail.defaultProps = {
  pokemon: null,
};

export default PokemonDetail;
