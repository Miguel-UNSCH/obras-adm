import CalendarCustom from "@/components/views/calendar-custom";
import DescriptionWork from "@/components/views/description-work";
import DetailWork from "@/components/views/destail-work";
import MapDrawingPolygon from "@/components/views/map-drawing-polygon";

interface Obra {
    tipo_proyecto: string;
    nombre: string;
    codigo_CUI: string;
    propietario_id: string;
    nombre_completo: string;
    coordinates: number[][];
}

const DetallesContainer: React.FC<{ obra: Obra }> = ({ obra }) => {

    return (
        <div className="h-full grid gap-x-4 gap-y-1 grid-cols-1 md:grid-cols-2 md:grid-rows-2 p-1 overflow-hidden">
            <div className="bg-gradient-to-tr from-[#FFCEB7] dark:from-[#0F172A] dark:to-[#065F46] to-[#E3D8D6] rounded-3xl shadow-xl overflow-hidden">
                <CalendarCustom />
            </div>

            <div className="rounded-3xl overflow-hidden">
                <MapDrawingPolygon obra={obra} />
            </div>

            <div className="p-3 rounded-3xl overflow-hidden">
                <DescriptionWork obra={obra} />
            </div>

            <div className="p-3 rounded-3xl overflow-hidden">
                <DetailWork />
            </div>
        </div>
    );
}

export default DetallesContainer;
