"use client";
import { Button } from "@/components/ui/button";
import NewCoordinates from "./obras-conteiner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const options = [
  { value: "directa", label: "Obras de administración directa" },
  { value: "contrata", label: "Obras de administración por contrata" }
];

function Page() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedOption) {
      console.log("Valor seleccionado:", selectedOption);
    } else {
      console.log("Por favor, selecciona una opción.");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFormSubmit} className="flex items-center space-x-4">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
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

        <Button type="submit" className="w-auto">
          Buscar
        </Button>
      </form>

      <div className="rounded-3xl overflow-hidden w-full h-[85vh] shadow-lg">
        <NewCoordinates />
      </div>
    </div>
  );
}

export default Page;
