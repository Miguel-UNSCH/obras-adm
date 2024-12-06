"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ObraList from "@/components/obraList";

interface Obra {
  id: string;
  tipo_proyecto: string;
  abreviatura: string;
  nombre: string;
  codigo_CUI: string;
}

type obrasProsp = {
  obrasT: Obra[];
}

function SideDashboard({ obrasT }: obrasProsp) {
  const [selectValue, setSelectValue] = useState<string | undefined>("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredObras, setFilteredObras] = useState<Obra[]>(obrasT);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const searchTerm = searchValue.toLowerCase();

    const filtered = obrasT.filter((obra) => {
      const matchesSelect = selectValue ? obra.tipo_proyecto === selectValue : true;

      const matchesSearch = 
        obra.nombre.toLowerCase().includes(searchTerm) || 
        obra.abreviatura.toLowerCase().includes(searchTerm) || 
        obra.codigo_CUI.includes(searchTerm);

      return matchesSelect && matchesSearch;
    });

    setFilteredObras(filtered);
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="text-center text-transparent bg-gradient-to-r text-slate-800 dark:text-white bg-clip-text font-extrabold text-4xl">
        <span>Obras</span>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <Select value={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OAD">Obras por administración directa</SelectItem>
            <SelectItem value="OC">Obras por contrata</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Buscar por descripción, abreviatura o código CUI"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button type="submit">Buscar</Button>
      </form>

      <div className="flex md:flex-col gap-4 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Lista de Obras</h1>
        <ObraList obras={filteredObras} />
      </div>
    </div>
  );
}

export default SideDashboard;
