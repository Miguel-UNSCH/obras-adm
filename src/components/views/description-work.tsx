import { FaMapMarkerAlt, FaCogs, FaUserAlt } from 'react-icons/fa';

interface Obra {
    id: string;
    cui: string;
    name: string;
    areaOrLength: string | null;
    resident: string;
    projectType: string;
  }

const DescriptionWork: React.FC<{ obra: Obra }> = ({ obra }) => {

    return (
        <div className="grid grid-cols h-full p-6 gap-1 bg-white dark:bg-gray-800 shadow-lg">
            <p className="font-bold text-gray-900 dark:text-white text-justify p-4 text-sm">
                {obra.name}
            </p>
            <div className="grid grid-cols-1">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaCogs className="text-lg text-blue-500" />
                    <p className="font-medium">Tipo de Proyecto:</p>
                    <span>{obra.projectType}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-lg text-green-500" />
                    <p className="font-medium">Código CUI:</p>
                    <span>{obra.cui}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaUserAlt className="text-lg text-yellow-500" />
                    <p className="font-medium">Residente:</p>
                    <span>{obra.resident}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-lg text-purple-500" />
                    <p className="font-medium">Medida Aproximada:</p>
                    <span>{obra.areaOrLength}</span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionWork;
