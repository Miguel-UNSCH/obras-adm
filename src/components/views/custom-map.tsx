"use client";

import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import { Feature, Polygon } from 'geojson';
// import { FillLayer } from 'maplibre-gl';

function CustomMap() {
  // Define los datos del polígono
  const polygonData: Feature<Polygon> = {
    type: 'Feature',
    properties: {}, // Añade propiedades, aunque estén vacías
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.222592, -13.149550],
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

  // Define el estilo del polígono
  const polygonLayer = {
    id: 'polygon-layer',
    type: 'fill', // Literal específico
    paint: {
      'fill-color': '#088ff5', // Color de relleno
      'fill-opacity': 0.3,   // Opacidad del relleno
    },
  } as const;

  return (
    <Map
      initialViewState={{
        longitude: -74.219805, // Centra el mapa en el polígono
        latitude: -13.146554,
        zoom: 14,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=qHY98vxGerd5lTUUPwyF"
    >
      {/* Control de navegación */}
      <NavigationControl position="bottom-right" style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        gap: "10px",
        borderRadius: "15px"
      }}/>

      {/* Marcador */}
      <Marker 
        longitude={-74.219805}
        latitude={-13.146554}
        color="red"
        
      />

      {/* Fuente de datos para el polígono */}
      <Source id="polygon-source" type="geojson" data={polygonData}>
        {/* Capa para dibujar el polígono */}
        <Layer {...polygonLayer} />
      </Source>
    </Map>
  );
}

export default CustomMap;
