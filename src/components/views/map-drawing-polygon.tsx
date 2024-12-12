"use client";

import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import { Feature, Polygon } from 'geojson';


interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
  coordinates: number[][];
}


const CustomMap: React.FC<{ obra: Obra }> = ({ obra }) => {
  const calculateCentroid = (coordinates: number[][]): { longitude: number; latitude: number } => {
    const [sumLon, sumLat] = coordinates.reduce(
      ([lon, lat], [coordLon, coordLat]) => [lon + coordLon, lat + coordLat],
      [0, 0]
    );

    return {
      latitude: sumLat / coordinates.length,
      longitude: sumLon / coordinates.length,
    };
  };

  const centroid = calculateCentroid(obra.coordinates);

  const polygonData: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [obra.coordinates],
    },
  };

  const polygonLayer = {
    id: 'polygon-layer',
    type: 'fill',
    paint: {
      'fill-color': '#F89142',
      'fill-opacity': 0.3,
    },
  } as const;

  return (
    <Map
      initialViewState={{
        longitude: centroid.longitude,
        latitude: centroid.latitude,
        zoom: 14,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=qHY98vxGerd5lTUUPwyF"
    >
      <NavigationControl position="bottom-right" style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        gap: "10px",
        borderRadius: "15px"
      }} />
      <Source id="polygon-source" type="geojson" data={polygonData}>
        <Layer {...polygonLayer} />
      </Source>
    </Map>

  );
}

export default CustomMap;
