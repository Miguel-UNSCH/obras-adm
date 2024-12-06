import React from 'react';
import ObraCard from './ObraCard';

interface Obra {
  id: string;
  tipo_proyecto: string;
  abreviatura: string;
  nombre: string;
  codigo_CUI: string;
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
