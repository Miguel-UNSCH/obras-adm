/* eslint-disable @typescript-eslint/prefer-as-const */
"use client";

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl';
import { Feature, Polygon, LineString } from 'geojson';


interface Obra {
  id: string;
  points: number[][];
  projectType: string;
}


const CustomMap: React.FC<{ obra: Obra }> = ({ obra }) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const typeObra = obra.projectType === 'Superficie' ? 'Polygon' : 'LineString';

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

  const centroid = calculateCentroid(obra.points);

  const layerConfig =
    typeObra === 'Polygon'
      ? {
        id: `polygon-layer-${obra.id}`,
        type: 'fill' as 'fill',
        paint: {
          'fill-color': '#E27373',
          'fill-opacity': 0.5,
          'fill-outline-color': '#FF0000',
        },
      }
      : {
        id: `line-layer-${obra.id}`,
        type: 'line' as 'line',
        paint: {
          'line-color': '#FF0000',
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

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        longitude: centroid.longitude,
        latitude: centroid.latitude,
        zoom: 14,
      }}
      attributionControl={false}
      mapStyle={'mapbox://styles/mapbox/standard'}
    >
      <NavigationControl position="bottom-right" style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        gap: "10px",
        borderRadius: "15px"
      }} />
      <Source id="polygon-source" type="geojson" data={geoJsonData}>
        <Layer {...layerConfig} />
      </Source>
    </Map>

  );
}

export default CustomMap;
