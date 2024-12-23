import React from 'react';

interface Obra {
  cui: string;
  name: string;
  resident: string;
  projectType: string;
}

const ObraCard: React.FC<{ obra: Obra }> = ({ obra }) => {
  return (
    <div className="bg-secondary p-2 rounded-lg space-y-2">
      <h1 className="text-center font-semibold">
        CUI: {obra.cui}
      </h1>
      <p className="text-secondary-foreground text-sm text-justify">
        {obra.name}
      </p>
      <p className="text-secondary-foreground text-sm text-justify">
        Tipo de proyecto: {obra.projectType}
      </p>
      <p className="text-secondary-foreground text-sm text-justify">
        Estado: Activo
      </p>
      <span className="text-sm text-gray-400">
        Residente: {obra.resident}
      </span>
    </div>
  );
};

export default ObraCard;