import { Feature, Polygon } from 'geojson';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker, Source, Layer } from 'react-map-gl/maplibre';
import { Button } from '@/components/ui/button';

interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
  coordinates: number[][];
}

const LocationObras: React.FC<{ obra: Obra }> = ({ obra }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const calculateCentroid = (coordinates: number[][]): { longitude: number; latitude: number } => {
    let sumLat = 0;
    let sumLon = 0;

    coordinates.forEach((coord) => {
      sumLat += coord[1];
      sumLon += coord[0];
    });

    const centroid = {
      latitude: sumLat / coordinates.length,
      longitude: sumLon / coordinates.length,
    };

    return centroid;
  };

  const centroid = calculateCentroid(obra.coordinates);

  const polygonLayer = {
    id: `polygon-layer-${obra.propietario_id}`,
    type: 'fill' as 'fill',
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.5,
      'fill-outline-color': '#000000',
    },
  };

  const polygonData: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [obra.coordinates],
    },
  };

  const handleMarkerClick = () => {
    setSelectedMarker('marker');
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleDetails = () => {
    console.log("Hola");
  }; 

  return (
    <>
      <Marker
        key={`centroid-marker-${obra.codigo_CUI}`}
        longitude={centroid.longitude}
        latitude={centroid.latitude}
        onClick={handleMarkerClick}
      >
        <div className="relative">
          <FaMapMarkerAlt className="text-[#FF0000] text-4xl z-0" /> {/* z-index ajustado */}
          <div
            className={`absolute top-0 left-0 ${selectedMarker === 'marker' && showDetails ? 'block' : 'hidden'} z-50`}
          >
            <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-lg shadow-lg w-max-6x1 w-[300px] mx-auto text-justify">
              <h2 className="text-[14px] font-extrabold mb-4 text-center">Detalles de la obra</h2>
              <div className="space-y-3">
                <div>
                  <strong className="text-[13px]">CUI:</strong> <span className="text-[12px] text-gray-200">{obra.codigo_CUI}</span>
                </div>
                <div>
                  <strong className="text-[13px]">Proyecto:</strong> <span className="text-[12px] text-gray-200">{obra.tipo_proyecto}</span>
                </div>
                <div>
                  <strong className="text-[13px]">Descripción del Proyecto:</strong>
                  <p className="text-[12px] leading-relaxed text-gray-200">
                    {obra.nombre}
                  </p>
                </div>
                <div>
                  <strong className="text-[13px]">Residente:</strong> <span className="text-[12px] text-gray-200">{obra.nombre_completo}</span>
                </div>
              </div>
              <div className="flex flex-row p-3">
                <Button className="mx-auto block" onClick={handleCloseDetails}>
                  Cerrar
                </Button>
                <Button className="mx-auto block" onClick={handleDetails}>
                  Detalles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Marker>
  
      <Source id={`source-${obra.propietario_id}`} type="geojson" data={polygonData}>
        <Layer {...polygonLayer} />
      </Source>
    </>
  );
    
};

export default LocationObras;
