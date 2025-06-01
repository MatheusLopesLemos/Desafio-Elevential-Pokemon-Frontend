import {
  Zap,
  Droplets,
  Leaf,
  Flame,
  Mountain,
  Bug,
  Ghost,
  AnvilIcon as Steel,
  Sparkles,
  Dices,
  Palette,
  Cloud,
  TreePine,
  Snowflake,
  ShieldQuestion,
  CircleDot,
  PawPrint,
} from 'lucide-react';

export const typeColors = {
  Normal: 'bg-gray-400',
  Fire: 'bg-orange-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-cyan-300',
  Fighting: 'bg-red-700',
  Poison: 'bg-purple-600',
  Ground: 'bg-yellow-800',
  Flying: 'bg-indigo-400',
  Psychic: 'bg-fuchsia-500',
  Bug: 'bg-lime-600',
  Rock: 'bg-stone-600',
  Ghost: 'bg-violet-700',
  Dragon: 'bg-indigo-700',
  Steel: 'bg-slate-500',
  Dark: 'bg-gray-800',
  Fairy: 'bg-pink-400',
};

export const typeIcons = {
  Grass: Leaf,
  Poison: Sparkles,
  Fire: Flame,
  Water: Droplets,
  Electric: Zap,
  Normal: CircleDot,
  Fairy: Sparkles,
  Ghost: Ghost,
  Steel: Steel,
  Bug: Bug,
  Rock: Mountain,
  Fighting: Dices,
  Psychic: Palette,
  Flying: Cloud,
  Ground: TreePine,
  Ice: Snowflake,
  Dragon: PawPrint,
  Dark: ShieldQuestion,
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getTipoColor = (type) => {
  const capitalizedType = capitalize(type);
  return typeColors[capitalizedType] || 'bg-gray-300';
};

export const getTipoIcon = (type) => {
  const capitalizedType = capitalize(type);
  return typeIcons[capitalizedType] || null;
};
