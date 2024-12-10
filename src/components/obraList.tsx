import React from 'react';
import ObraCard from './ObraCard';

interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
}

const ObraList: React.FC<{ obras: Obra[] }> = ({ obras }) => {
  return (
    <div className="space-y-4">
      {obras.map((obra, index) => (
        <ObraCard key={index} obra={obra} />
      ))}
    </div>
  );
};

export default ObraList;
