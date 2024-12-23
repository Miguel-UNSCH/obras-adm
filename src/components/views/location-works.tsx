/* eslint-disable @typescript-eslint/prefer-as-const */
import { Feature, Polygon, LineString } from 'geojson';
import { useState } from 'react';
import { FaRoad, FaBuilding } from 'react-icons/fa';
import { Marker, Source, Layer } from 'react-map-gl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Obra {
  id: string;
  cui: string;
  name: string;
  points: number[][];
  areaOrLength: string | null;
  resident: string;
  projectType: string;
  propietario_id: string;
}

const LocationObras: React.FC<{ obra: Obra }> = ({ obra }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const typeObra = obra.projectType === 'Superficie' ? 'Polygon' : 'LineString';

  const calculateCentroid = (coordinates: number[][]): { longitude: number; latitude: number } => {
    let sumLat = 0;
    let sumLon = 0;

    coordinates.forEach((coord) => {
      sumLat += coord[1];
      sumLon += coord[0];
    });

    return {
      latitude: sumLat / coordinates.length,
      longitude: sumLon / coordinates.length,
    };
  };
  const calculateMitad = (coordinates: number[][]): { longitude: number; latitude: number } => {
    const midIndex = Math.floor(coordinates.length / 2);
    return {
      latitude: coordinates[midIndex][1],
      longitude: coordinates[midIndex][0],
    };
  }

  const centroid = obra.projectType === 'Superficie' ? calculateCentroid(obra.points) : calculateMitad(obra.points);

  const layerConfig =
    typeObra === 'Polygon'
      ? {
        id: `polygon-layer-${obra.id}`,
        type: 'fill' as 'fill',
        paint: {
          'fill-color': '#088ff5',
          'fill-opacity': 0.5,
          'fill-outline-color': '#000000',
        },
      }
      : {
        id: `line-layer-${obra.id}`,
        type: 'line' as 'line',
        paint: {
          'line-color': '#14437F',
          'line-width': 5,
        },
      };

  const geoJsonData: Feature<Polygon | LineString> =
    typeObra === 'Polygon'
      ? {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [obra.points],
        },
      }
      : {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: obra.points,
        },
      };

  const handleMarkerClick = () => {
    setSelectedMarker('marker');
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <Marker
        key={`centroid-marker-${obra.cui}`}
        longitude={centroid.longitude}
        latitude={centroid.latitude}
        onClick={handleMarkerClick}
      >
        <div className="relative">

          {obra.projectType === "Superficie" ? (
            <FaBuilding className="text-[#DC2626] text-2xl z-0" />
          ) : obra.projectType === "Carretera" ? (
            <FaRoad className="text-[#F77717] text-2xl z-0" />
          ) : null}

          <div
            className={`absolute top-0 left-0 ${selectedMarker === "marker" && showDetails ? "block" : "hidden"
              } z-50`}
          >
            <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-lg shadow-lg max-w-full sm:max-w-lg w-[320px] mx-auto text-justify">
              <h2 className="text-[14px] font-extrabold mb-4 text-center">Detalles de la obra</h2>
              <div className="space-y-3">
                <div>
                  <strong className="text-[13px]">CUI:</strong>{' '}
                  <span className="text-[12px] text-gray-200">{obra.cui}</span>
                </div>
                <div>
                  <strong className="text-[13px]">Proyecto:</strong>{' '}
                  <span className="text-[12px] text-gray-200">{obra.projectType}</span>
                </div>
                <div>
                  <strong className="text-[13px]">Descripción del Proyecto:</strong>
                  <p className="text-[12px] leading-relaxed text-gray-200">{obra.name}</p>
                </div>
                <div>
                  <strong className="text-[13px]">Residente:</strong>{' '}
                  <span className="text-[12px] text-gray-200">{obra.resident}</span>
                </div>
              </div>
              <div className="flex flex-row p-3">
                <Button className="mx-auto block" onClick={handleCloseDetails}>
                  Cerrar
                </Button>
                <Link
                  href={`/dashboard/detalles/${obra.id}`}
                  className="mx-auto px-4 py-2 bg-green-400 text-sm text-center items-center rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Detalles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Marker>

      <Source id={`source-${obra.id}`} type="geojson" data={geoJsonData}>
        <Layer {...layerConfig} />
      </Source>
    </>
  );
};

export default LocationObras;
