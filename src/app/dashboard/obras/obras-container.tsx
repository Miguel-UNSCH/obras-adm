"use client";

import NewCoordinates from "@/components/views/register-Location";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import ButtonSave from "@/components/ui/icons-save";
import { guardarObra } from "@/actions/obras-actions";
import * as turf from "@turf/turf";

interface ObrasProps {
  nombre: string;
  codigo_CUI: string;
  nombre_completo: string;
}

interface OptionProps {
  value: string;
  label: string;
}

type ObrasContainerProps = {
  obras: ObrasProps[];
};

function ObrasContainer({ obras }: ObrasContainerProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [points, setPoints] = useState<[number, number][]>([]);
  const [projectType, setProjectType] = useState<string>("");

  const options: OptionProps[] = useMemo(
    () => obras.map((obra) => ({ value: obra.nombre, label: obra.nombre })),
    [obras]
  );

  const handleSaveClick = async () => {
    if (!selectedOption) return console.log("Por favor, selecciona una opción.");

    if (points.length < 2) return console.log("Se necesitan al menos 2 puntos", points.length);

    const coordinates = [...points];

    // Asegúrate de que el primer y último punto sean iguales si se está creando un polígono
    if (!turf.booleanEqual(turf.point(coordinates[0]), turf.point(coordinates[coordinates.length - 1]))) {
      coordinates.push(coordinates[0]);
    }

    let areaOrLength: string;

    // Si el tipo de proyecto es 'figura', calculamos el área del polígono
    if (projectType === "figura") {
      const polygon = turf.polygon([coordinates]);
      const area = turf.area(polygon).toFixed(2);  // Área en metros cuadrados
      areaOrLength = `${area} m²`;  // Mostramos el área
    }
    // Si el tipo de proyecto es 'línea', calculamos la longitud de la línea
    else if (projectType === "linea") {
      const line = turf.lineString(coordinates);
      const length = turf.length(line, { units: 'meters' }).toFixed(2);  // Longitud en metros
      areaOrLength = `${length} m`;  // Mostramos la longitud
    } else {
      return console.log("Tipo de proyecto no válido.");
    }

    const obraSeleccionada = obras.find((obra) => obra.nombre === selectedOption);
    if (!obraSeleccionada) return console.error("No se encontró la obra seleccionada.");

    try {
      await guardarObra(
        obraSeleccionada.nombre_completo,
        projectType,
        obraSeleccionada.codigo_CUI,
        selectedOption,
        coordinates,
        areaOrLength  // Enviamos el área o longitud
      );
      console.log("Datos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Select onValueChange={setSelectedOption}>
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
        <NewCoordinates points={points} setPoints={setPoints} setProjectType={setProjectType} />
      </div>
    </div>
  );
}

export default ObrasContainer;