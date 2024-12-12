import { FaMapMarkerAlt, FaCogs, FaUserAlt } from 'react-icons/fa';
import * as turf from '@turf/turf';

interface Obra {
    tipo_proyecto: string;
    nombre: string;
    codigo_CUI: string;
    propietario_id: string;
    nombre_completo: string;
    coordinates: number[][];
}

const DescriptionWork: React.FC<{ obra: Obra }> = ({ obra }) => {
    const coordinates = [...obra.coordinates];
    if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        coordinates.push(coordinates[0]);
    }

    const polygon = turf.polygon([coordinates]);
    const area = turf.area(polygon);  // El área se calcula en metros cuadrados por defecto

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                {obra.nombre}
            </h2>
            <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaCogs className="text-lg text-blue-500" />
                    <p className="font-medium">Tipo de Proyecto:</p>
                    <span>{obra.tipo_proyecto}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-lg text-green-500" />
                    <p className="font-medium">Código CUI:</p>
                    <span>{obra.codigo_CUI}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaUserAlt className="text-lg text-yellow-500" />
                    <p className="font-medium">Residente:</p>
                    <span>{obra.nombre_completo} ({obra.propietario_id})</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-lg text-purple-500" />
                    <p className="font-medium">Área Aproximada:</p>
                    <span>{area.toFixed(2)} m²</span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionWork;
