import React from 'react';

interface Obra {
  id: string;
  tipo_proyecto: string;
  abreviatura: string;
  nombre: string;
  codigo_CUI: string;
}

const ObraCard: React.FC<{ obra: Obra }> = ({ obra }) => {
  return (
    <div className="bg-secondary p-2 rounded-lg space-y-2">
      <h1 className="text-center font-semibold">
        CUI: {obra.codigo_CUI}
      </h1>
      <p className="text-secondary-foreground text-sm text-justify">
        {obra.nombre}
      </p>
      <span className="text-sm text-gray-400">
        Proyecto: {obra.tipo_proyecto}
      </span>
    </div>
  );
};

export default ObraCard;