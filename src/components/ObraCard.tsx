import React from 'react';

interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
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
        Residente: {obra.nombre_completo}
      </span>
    </div>
  );
};

export default ObraCard;