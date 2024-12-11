"use client";

import NewCoordinates from "@/components/views/register-Location";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import ButtonSave from "@/components/ui/icons-save";

interface OptionProps {
  value: string;
  label: string;
}

interface ObrasContainerProps {
  options: OptionProps[];
}

function ObrasContainer({ options }: ObrasContainerProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [points, setPoints] = useState<[number, number][]>([]);


  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSaveClick = () => {
    if (!selectedOption) {
      console.log("Por favor, selecciona una opción.");
    } else {
      if (points.length < 3) {
        console.log("Se necesita más de 3 puntos", points.length);
      } else {
        console.log("Valor seleccionado:", selectedOption);
        console.log("Puntos guardados:", points);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full sm:w-[400px] md:w-[550px] lg:w-[800px] xl:w-[1140px]">
            <SelectValue placeholder="Seleccionar opción" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ButtonSave onClick={handleSaveClick} />
      </div>

      <div className="rounded-3xl overflow-hidden w-full h-[85vh] shadow-lg">
        <NewCoordinates points={points} setPoints={setPoints} />
      </div>
    </div>
  );
}

export default ObrasContainer;
