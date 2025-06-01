import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTipoColor, getTipoIcon, capitalize } from '../utils/typeUtils';

function PokemonListItem({ pokemon, isSelected, onClick }) {
  // Garantir que tipoPrincipal e tipoSecundario (se existirem) tenham a propriedade 'nome'
  const TipoPrincipalIcon = getTipoIcon(pokemon.tipoPrincipal?.nome);
  const TipoSecundarioIcon = pokemon.tipoSecundario?.nome
    ? getTipoIcon(pokemon.tipoSecundario.nome)
    : null;

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
        isSelected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-red-300'
      }`}
      onClick={() => onClick(pokemon)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={pokemon.gif || 'https://via.placeholder.com/150'} // Usa pokemon.gif para a imagem
              alt={pokemon.nome} // Usa pokemon.nome para o texto alternativo
              className="w-20 h-20 object-contain rounded-lg" // Mantém a proporção da imagem
            />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              #{pokemon.codigo?.toString().padStart(3, '0') || '???'}{' '}
              {/* Mostra pokemon.codigo */}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {capitalize(pokemon.nome)}{' '}
              {/* Mostra pokemon.nome capitalizado */}
            </h3>
            <div className="flex flex-wrap gap-1">
              <Badge // Badge para o Tipo Principal
                className={`${getTipoColor(pokemon.tipoPrincipal?.nome)} text-white text-xs px-2 py-1 flex items-center gap-1`}
              >
                {TipoPrincipalIcon && <TipoPrincipalIcon className="w-3 h-3" />}
                {capitalize(pokemon.tipoPrincipal?.nome || 'Desconhecido')}
              </Badge>
              {pokemon.tipoSecundario &&
                pokemon.tipoSecundario.nome && ( // Badge para o Tipo Secundário (se existir)
                  <Badge
                    className={`${getTipoColor(pokemon.tipoSecundario.nome)} text-white text-xs px-2 py-1 flex items-center gap-1`}
                  >
                    {TipoSecundarioIcon && (
                      <TipoSecundarioIcon className="w-3 h-3" />
                    )}
                    {capitalize(pokemon.tipoSecundario.nome)}
                  </Badge>
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

PokemonListItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired, // Propriedade para o ID do Pokémon
    codigo: PropTypes.number.isRequired, // Propriedade para o código do Pokémon
    nome: PropTypes.string.isRequired, // Propriedade para o nome do Pokémon
    gif: PropTypes.string, // URL do GIF do Pokémon
    tipoPrincipal: PropTypes.shape({
      // Objeto para o tipo principal
      nome: PropTypes.string.isRequired,
    }).isRequired,
    tipoSecundario: PropTypes.shape({
      // Objeto para o tipo secundário (opcional)
      nome: PropTypes.string.isRequired,
    }),
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PokemonListItem;
