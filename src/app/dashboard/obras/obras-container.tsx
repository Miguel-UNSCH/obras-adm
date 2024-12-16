"use client";

import NewCoordinates from "@/components/views/register-Location";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import ButtonSave from "@/components/ui/icons-save";
import { guardarObra } from "@/actions/obras-actions";
import * as turf from "@turf/turf";
import toasterCustom from "@/components/toaster-custom";
import { toast } from "sonner";

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
    // Verificar si se seleccionó una opción en el select
    if (!selectedOption) {
      toasterCustom(400, "Por favor, selecciona una obra antes de continuar.");
      return;
    }

    // Verificar si hay al menos 3 puntos únicos
    if (points.length < 3) {
      toasterCustom(400, "Por favor, introduce al menos 3 puntos para continuar.");
      return;
    }

    const coordinates = [...points];

    // Asegúrate de cerrar el polígono
    if (!turf.booleanEqual(turf.point(coordinates[0]), turf.point(coordinates[coordinates.length - 1]))) {
      coordinates.push(coordinates[0]);
    }

    if (coordinates.length < 4) {
      toasterCustom(400, "El polígono no tiene suficientes puntos para ser válido.");
      return;
    }

    let areaOrLength;

    // Calcular área o longitud según el tipo de proyecto
    if (projectType === "figura") {
      try {
        const polygon = turf.polygon([coordinates]);
        const area = turf.area(polygon).toFixed(2); // Área en metros cuadrados
        areaOrLength = `${area} m²`;
      } catch (error) {
        toasterCustom(500, "Error al calcular el área del polígono.");
        return;
      }
    } else if (projectType === "linea") {
      try {
        const line = turf.lineString(coordinates);
        const length = turf.length(line, { units: "meters" }).toFixed(2); // Longitud en metros
        areaOrLength = `${length} m`;
      } catch (error) {
        toasterCustom(500, "Error al calcular la longitud de la línea.");
        return;
      }
    } else {
      toasterCustom(400, "Tipo de proyecto no válido.");
      return;
    }

    const obraSeleccionada = obras.find((obra) => obra.nombre === selectedOption);
    if (!obraSeleccionada) {
      toasterCustom(400, "No se encontró la obra seleccionada.");
      return;
    }

    try {
      // Validar antes de enviar
      if (!obraSeleccionada || !coordinates || !areaOrLength) {
        toasterCustom(400, "Por favor complete todos los campos requeridos.");
        return;
      }

      const data = await guardarObra(
        obraSeleccionada.nombre_completo,
        projectType,
        obraSeleccionada.codigo_CUI,
        selectedOption,
        coordinates,
        areaOrLength
      );

      if (!data) {
        toasterCustom(500, "Ocurrió un error inesperado");
        return;
      }

      toast.dismiss();
      toasterCustom(data.status, data.message);

      // Recargar la página si se guardó correctamente
      if (data.status === 200) {
        setTimeout(() => {
          window.location.reload(); // Actualiza la página después de un breve retraso
        }, 1000); // Opcional: espera 1 segundo para mostrar el mensaje antes de recargar
      }
    } catch (error) {
      toasterCustom(500, "Error al procesar la solicitud.");
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