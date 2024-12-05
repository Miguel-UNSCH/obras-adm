"use client";

import { useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import { Feature, Polygon } from 'geojson';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button } from '../ui/button';

function CustomMap() {
  const [isClient, setIsClient] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null); // Nuevo estado para el marcador seleccionado
  const [showDetails, setShowDetails] = useState<boolean>(false); // Estado para mostrar/ocultar la ventana de detalles

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Datos de los polígonos
  const polygonData: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.222602, -13.149612],
          [-74.217914, -13.150564],
          [-74.214760, -13.148406],
          [-74.215634, -13.146604],
          [-74.218606, -13.145063],
          [-74.221734, -13.142415],
          [-74.222726, -13.140733],
          [-74.222501, -13.139693],
          [-74.222817, -13.138841],
          [-74.222388, -13.137410],
          [-74.222576, -13.137013],
          [-74.223649, -13.136512],
          [-74.223761, -13.139190],
          [-74.224373, -13.139266],
          [-74.224230, -13.140496],
          [-74.226143, -13.141530],
          [-74.224333, -13.144073],
          [-74.224722, -13.144309],
          [-74.224124, -13.145134],
          [-74.223997, -13.146426],
          [-74.224287, -13.146644],
          [-74.222741, -13.148810],
          [-74.222575, -13.149254],
        ],
      ],
    },
  };

  const polygonData1: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.206840, -13.162083],
          [-74.205835, -13.159642],
          [-74.201010, -13.160051],
          [-74.201484, -13.161868],
          [-74.203057, -13.162084],
        ],
      ],
    },
  };

  // Capas de los polígonos
  const polygonLayer1 = {
    id: 'polygon-layer-1',
    type: 'fill' as 'fill', // Asegúrate de que el tipo sea 'fill' para capas de polígonos
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.3,
    },
  };

  const polygonLayer2 = {
    id: 'polygon-layer-2',
    type: 'fill' as 'fill', // Asegúrate de que el tipo sea 'fill' para capas de polígonos
    paint: {
      'fill-color': '#ff6347',
      'fill-opacity': 0.3,
    },
  };

  // Función para manejar el clic en los marcadores
  const handleMarkerClick = (id: string) => {
    setSelectedMarker(id); // Al hacer clic, actualizamos el estado con el id del marcador
    setShowDetails(true); // Mostrar el detalle de la obra cuando se hace clic en el marcador
  };

  // Función para cerrar la ventana de detalles
  const handleCloseDetails = () => {
    setShowDetails(false); // Ocultar la ventana de detalles
  };

  return (
    <Map
      initialViewState={{
        longitude: -74.213586,
        latitude: -13.166720,
        zoom: 13,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=qHY98vxGerd5lTUUPwyF"
    >
      <NavigationControl
        position="bottom-right"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "10px",
          borderRadius: "15px",
        }}
      />

      {/* Marcador para la obra N1 */}
      <Marker
        longitude={-74.220767}
        latitude={-13.146605}
        onClick={() => handleMarkerClick('obra1')} // Pasa un id único para cada marcador
      >
        <FaMapMarkerAlt className="text-[#FF0000] text-4xl" />
        <div className={`absolute top-0 left-0 ${selectedMarker === 'obra1' && showDetails ? 'block' : 'hidden'}`}>
          <p>TITULO: OBRAS N1</p>
          <br />
          <Button onClick={handleCloseDetails}>Cerrar</Button>
        </div>
      </Marker>

      {/* Marcador para la obra N2 */}
      <Marker
        longitude={-74.204258}
        latitude={-13.160892}
        onClick={() => handleMarkerClick('obra2')} // Pasa un id único para cada marcador
      >
        <FaMapMarkerAlt className="text-[#FF0000] text-4xl" />
        <div className={`absolute top-0 left-0 ${selectedMarker === 'obra2' && showDetails ? 'block' : 'hidden'}`}>
          <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-lg shadow-lg w-max-6x1 w-[300px] mx-auto text-justify">
            <h2 className="text-[14px] font-extrabold mb-4 text-center">Detalles del Proyecto</h2>
            <div className="space-y-3">
              <div>
                <strong className="text-[13px]">CUI:</strong> <span className="text-[12px] text-gray-200">4124523</span>
              </div>
              <div>
                <strong className="text-[13px]">Proyecto:</strong> <span className="text-[12px] text-gray-200">OAD</span>
              </div>
              <div>
                <strong className="text-[13px]">Descripción del Proyecto:</strong>
                <p className="text-[12px] leading-relaxed text-gray-200">
                  MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS DEL SANTUARIO DE LA MEMORIA LA HOYADA EN EL DISTRITO DE ANDRES AVELINO CACERES -
                  PROVINCIA DE HUAMANGA - DEPARTAMENTO DE AYACUCHO
                </p>
              </div>
              <div>
                <strong className="text-[13px]">Residente:</strong> <span className="text-[12px] text-gray-200">Ing. Juan Pérez</span>
              </div>
            </div>
            <Button
              className="mx-auto block"
              onClick={handleCloseDetails}
            >
              Cerrar
            </Button>

          </div>
        </div>
      </Marker>

      {/* Capas de polígonos */}
      <Source id="polygon-source" type="geojson" data={polygonData}>
        <Layer {...polygonLayer1} />
      </Source>

      <Source id="polygon-source1" type="geojson" data={polygonData1}>
        <Layer {...polygonLayer2} />
      </Source>
    </Map>
  );
}

export default CustomMap;
