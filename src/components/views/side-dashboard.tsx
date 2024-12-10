"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ObraList from "@/components/obraList";

interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
}

type obrasProsp = {
  obrasT: Obra[];
}

function SideDashboard({ obrasT }: obrasProsp) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredObras, setFilteredObras] = useState<Obra[]>(obrasT);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const searchTerm = searchValue.toLowerCase();

    const filtered = obrasT.filter((obra) => {

      const matchesSearch = 
        obra.nombre.toLowerCase().includes(searchTerm) || 
        obra.codigo_CUI.toLowerCase().includes(searchTerm) || 
        obra.nombre_completo.toLowerCase().includes(searchTerm);

      return matchesSearch;
    });

    setFilteredObras(filtered);
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="text-center text-transparent bg-gradient-to-r text-red-600 dark:text-white bg-clip-text font-extrabold text-4xl">
        <span>Obras por administración directa</span>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <Input
          placeholder="Buscar por código CUI, descripción o residente"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button type="submit">Buscar</Button>
      </form>

      <div className="flex md:flex-col gap-4 overflow-auto">
        <ObraList obras={filteredObras} />
      </div>
    </div>
  );
}

export default SideDashboard;
