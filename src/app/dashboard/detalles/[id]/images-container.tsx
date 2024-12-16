import CalendarCustom from "@/components/views/calendar-custom";
import ImageWork from "@/components/views/image-work";
import { useState } from "react";

interface Imgs {
    id: string;
    url: string | null;
    latitud: string | null;
    longitud: string | null;
    date: Date | null;
}

const ImagesContainer: React.FC<{ imgs: Imgs[] | null }> = ({ imgs }) => {
    const [day, setDay] = useState<string>("");

    const trabajadas = ["2024-12-01", "2024-12-04", "2024-12-05"];

    if (!imgs) return <div>No hay imágenes disponibles.</div>;
    console.log(day);

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-1 bg-gradient-to-tr from-[#FFCEB7] dark:from-[#0F172A] dark:to-[#065F46] to-[#E3D8D6] rounded-3xl shadow-xl overflow-hidden">
                <CalendarCustom Daysworked={trabajadas} setDay={setDay} />
            </div>
            <div className="flex-1 overflow-hidden">
                <ImageWork imgs={imgs} />
            </div>
        </div>
    );
};

export default ImagesContainer;
