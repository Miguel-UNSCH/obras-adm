"use client";

import NewCoordinates from "@/components/views/register-Location";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import ButtonSave from "@/components/ui/icons-save";
import { guardarObra } from "@/actions/obras-actions";
import * as turf from "@turf/turf";
import toasterCustom from "@/components/toaster-custom";
import { toast } from "sonner";

// Define interfaces
interface ObrasProps {
  nombre: string;
  codigo_CUI: string;
  nombre_completo: string;
  propietario_id: string;
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
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const options: OptionProps[] = useMemo(
    () => obras.map((obra) => ({ value: obra.nombre, label: obra.nombre })),
    [obras]
  );

  const handleSaveClick = async () => {
    // Validar primero los campos requeridos antes de mostrar el modal
    if (!selectedOption) {
      toasterCustom(400, "Por favor, selecciona una obra antes de continuar.");
      return;
    }

    if (points.length < 3) {
      toasterCustom(400, "Por favor, introduce al menos 3 puntos para continuar.");
      return;
    }

    // Si la validación es exitosa, mostrar el modal de confirmación
    handleShowConfirmationModal();
  };

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true); // Mostrar el modal de confirmación
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false); // Cerrar el modal de confirmación
  };

  const handleConfirmSave = async () => {
    const coordinates = [...points];

    // Asegúrate de cerrar el polígono si no está cerrado
    if (!turf.booleanEqual(turf.point(coordinates[0]), turf.point(coordinates[coordinates.length - 1]))) {
      coordinates.push(coordinates[0]);
    }

    if (coordinates.length < 4) {
      toasterCustom(400, "El polígono no tiene suficientes puntos para ser válido.");
      return;
    }

    let areaOrLength;

    // Calcular área o longitud según el tipo de proyecto
    if (projectType === "Superficie") {
      try {
        const polygon = turf.polygon([coordinates]);
        const area = turf.area(polygon).toFixed(2); // Área en metros cuadrados
        areaOrLength = `${area} m²`;
      } catch (error) {
        toasterCustom(500, "Error al calcular el área del polígono.");
        return;
      }
    } else if (projectType === "Carretera") {
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
      if (!obraSeleccionada || !coordinates || !areaOrLength) {
        toasterCustom(400, "Por favor complete todos los campos requeridos.");
        return;
      }

      const data = await guardarObra(
        obraSeleccionada.nombre_completo,
        projectType,
        obraSeleccionada.codigo_CUI,
        selectedOption,
        points,
        areaOrLength,
        obraSeleccionada.propietario_id,
      );

      if (!data) {
        toasterCustom(500, "Ocurrió un error inesperado");
        return;
      }

      toast.dismiss();
      toasterCustom(data.status, data.message);

      if (data.status === 200) {
        setTimeout(() => {
          window.location.reload(); // Recarga la página después de un breve retraso
        }, 1000); // Opcional: espera 1 segundo antes de recargar
      }
    } catch (error) {
      toasterCustom(500, "Error al procesar la solicitud.");
      console.error("Error al guardar los datos:", error);
    }

    handleCloseConfirmationModal(); // Cerrar el modal después de guardar
  };

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-row-1 md:grid-cols-[1fr_auto] items-center gap-4">
        <Select onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar opción" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ButtonSave onClick={handleSaveClick} /> {/* Mostrar el modal al hacer clic */}
      </div>

      <div className="rounded-3xl overflow-hidden w-full h-[85vh] shadow-lg">
        <NewCoordinates points={points} setPoints={setPoints} setProjectType={setProjectType} />
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">¿Está seguro de que desea guardar?</h2>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmSave}
              >
                Sí
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCloseConfirmationModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObrasContainer;
