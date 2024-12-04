"use client";

import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { useState, useCallback } from 'react';
import { Feature, Polygon } from 'geojson';

import { TbPointFilled } from "react-icons/tb";

function MapDrawingPolygon() {
  // Especifica el tipo del estado 'points' como un array de coordenadas [number, number]
  const [points, setPoints] = useState<[number, number][]>([]);
  // Especifica el tipo del estado 'polygonData' como 'Feature<Polygon> | null'
  const [polygonData, setPolygonData] = useState<Feature<Polygon> | null>(null);
  // Manejador para los clics en el mapa
  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, [lng, lat] as [number, number]];
      // Actualiza los datos del polígono si hay al menos 3 puntos
      if (newPoints.length >= 3) {
        setPolygonData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [newPoints.concat([newPoints[0]])], // Cierra el polígono repitiendo el primer punto
          },
          properties: {},
        });
      }
      return newPoints;
    });
  }, []);

  // Define el estilo del polígono
  const polygonLayer = {
    id: 'polygon-layer',
    type: 'fill',
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.3,
    },
  } as const;

  return (
    <Map
      initialViewState={{
        longitude: -74.219805,
        latitude: -13.146554,
        zoom: 14,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/winter-v2-dark/style.json?key=qHY98vxGerd5lTUUPwyF"
      onClick={handleMapClick}
    >
      {/* Control de navegación */}
      <NavigationControl
        position="bottom-right"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "10px",
          borderRadius: "15px"
        }}
      />

      {/* Marcadores para cada punto */}
      {points.map((point, index) => (
        <Marker key={index} longitude={point[0]} latitude={point[1]} color="blue">
          <TbPointFilled />
        </Marker>
      ))}

      {/* Fuente y capa para dibujar el polígono */}
      {polygonData && (
        <Source id="polygon-source" type="geojson" data={polygonData}>
          <Layer {...polygonLayer} />
        </Source>
      )}
    </Map>
  );
}

export default MapDrawingPolygon;
