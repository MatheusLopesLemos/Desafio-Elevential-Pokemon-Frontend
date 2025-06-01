import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-8">
      {/* O spinner em si. Ajuste w-12 h-12 para mudar o tamanho. */}
      <div
        className="w-12 h-12 rounded-full animate-spin
                   border-4 border-solid border-red-500 border-t-transparent"
        role="status"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}
