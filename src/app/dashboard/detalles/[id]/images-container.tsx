import CalendarCustom from "@/components/views/calendar-custom";
import ImageWork from "@/components/views/image-work";
import { useState } from "react";

// Definimos el tipo de las propiedades que recibirá el componente
interface Imgs {
  id: string;
  url: string | null;
  latitud: string | null;
  longitud: string | null;
  date: Date | null;
  update: string | null;
  propietario_id: string;
}

interface ImagesContainerProps {
  imgs: Imgs[] | null;
  setDay: React.Dispatch<React.SetStateAction<string>>; // Propiedad para manejar el día seleccionado
}

const ImagesContainer: React.FC<ImagesContainerProps> = ({ imgs, setDay }) => {
  // Aseguramos que dayT siempre sea un array de strings y eliminamos valores null
  const dayT = imgs?.map((result) => result.update).filter((update): update is string => update !== null) ?? [];

  if (!imgs) return <div>No hay imágenes disponibles.</div>;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex-1 bg-gradient-to-tr from-[#FFCEB7] dark:from-[#0F172A] dark:to-[#065F46] to-[#E3D8D6] rounded-3xl shadow-xl overflow-hidden">
        <CalendarCustom Daysworked={dayT} setDay={setDay} />
      </div>
      <div className="flex-1 overflow-hidden">
        <ImageWork imgs={imgs} />
      </div>
    </div>
  );
};

export default ImagesContainer;
