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
}

interface ImagesContainerProps {
  imgs: Imgs[] | null;
}

// Obtener la fecha actual en formato "YYYY-MM-DD"
const today = new Date().toISOString().split("T")[0];

const ImagesContainer: React.FC<ImagesContainerProps> = ({ imgs }) => {
  const [day, setDay] = useState<string>(today); // Día actual como valor por defecto

  // Aseguramos que dayT siempre sea un array de strings y eliminamos valores null
  const dayT = imgs?.map((result) => result.update).filter((update): update is string => update !== null) ?? [];

  // Filtramos las imágenes que coinciden con el día seleccionado
  const onlyDay = imgs?.filter((result) => result.update === (day + "T00:00")) ?? [];

  return (
    <div className="grid grid-rows-[1fr_1fr] h-full gap-y-4">
      <div className="bg-gradient-to-tr from-[#FFCEB7] dark:from-[#0F172A] dark:to-[#065F46] to-[#E3D8D6] rounded-3xl">
        <CalendarCustom Daysworked={dayT} setDay={setDay} />
      </div>
      <div className="p-2 rounded-3xl bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
        <ImageWork imgs={onlyDay} />
      </div>
    </div>
  );
};

export default ImagesContainer;