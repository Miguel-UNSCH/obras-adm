"use client";

import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, NavigationControl, Source, Layer, MapLayerMouseEvent } from 'react-map-gl';
import { useState, useCallback, useEffect } from 'react';
import { Feature, Polygon, LineString } from 'geojson';
import { TbPointFilled } from "react-icons/tb";
import ButtonBack from '@/components/ui/icons-back';
import Radio from './option-figura';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface NewCoordinatesProps {
  points: [number, number][];
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>; // Función para actualizar los puntos en el componente padre
  setProjectType: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar el tipo de proyecto en el componente padre
}

function NewCoordinates({ points, setPoints, setProjectType }: NewCoordinatesProps) {
  const [polygonData, setPolygonData] = useState<Feature<Polygon> | null>(null);
  const [lineData, setLineData] = useState<Feature<LineString> | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const defaultLocation: UserLocation = { latitude: -13.160441, longitude: -74.225832 };
  const [localPoints, setLocalPoints] = useState<[number, number][]>(points);
  const [projectType, setProjectTypeState] = useState<string>("Superficie");
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  // Función para actualizar los datos de la geometría (polígono o línea)
  const updateGeometryData = useCallback((points: [number, number][], projectType: string) => {
    if (projectType === 'Superficie' && points.length >= 3) {
      setPolygonData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [points.concat([points[0]])], // Cierra el polígono
        },
        properties: {},
      });
      setLineData(null); // Elimina los datos de la línea cuando se cambia a polígono
    } else if (projectType === 'Carretera' && points.length >= 2) {
      setLineData({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points,
        },
        properties: {},
      });
      setPolygonData(null); // Elimina los datos del polígono cuando se cambia a línea
    } else {
      setPolygonData(null);
      setLineData(null);
    }
  }, []);

  // Función para manejar el clic en el mapa y agregar puntos
  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;

    setLocalPoints((prevPoints) => {
      const newPoints: [number, number][] = [...prevPoints, [lng, lat]];

      // Verificar el tipo de proyecto
      if (projectType === 'Carretera' && newPoints.length >= 2) {
        // Solo se debe actualizar la línea si hay al menos 2 puntos
        setLineData({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: newPoints,
          },
          properties: {},
        });
        setPolygonData(null); // Elimina el polígono si es línea
      } else if (projectType === 'Superficie' && newPoints.length >= 3) {
        // Solo se debe actualizar el polígono si hay al menos 3 puntos
        setPolygonData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [newPoints.concat([newPoints[0]])], // Cierra el polígono
          },
          properties: {},
        });
        setLineData(null); // Elimina la línea si es polígono
      }

      return newPoints;
    });
  }, [projectType]);

  useEffect(() => {
    // Al cambiar el tipo de proyecto, actualizamos la geometría
    updateGeometryData(localPoints, projectType);
  }, [projectType, localPoints, updateGeometryData]);


  useEffect(() => {
    setPoints(localPoints);
  }, [localPoints, setPoints]);

  const handleRemoveLastPoint = () => {
    setLocalPoints((prevPoints) => {
      const updatedPoints = prevPoints.slice(0, -1);
      updateGeometryData(updatedPoints, projectType);
      return updatedPoints;
    });
  };

  const handleProjectTypeChange = (newType: string) => {
    setProjectTypeState(newType);  // Actualiza el estado local
    setProjectType(newType);  // Actualiza el estado en el componente padre
  };

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('La geolocalización no es soportada por este navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLocationError(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('El usuario denegó el permiso de geolocalización');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('La posición geográfica no está disponible');
            break;
          case error.TIMEOUT:
            setLocationError('La solicitud de geolocalización ha superado el tiempo de espera');
            break;
          default:
            setLocationError('Error desconocido al obtener la ubicación');
        }
      },
      { timeout: 2500 }
    );
  }, []);

  useEffect(() => {
    requestLocation();

    const timeoutId = setTimeout(() => {
      if (!userLocation) {
        setUserLocation(defaultLocation);
      }
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [userLocation, requestLocation, defaultLocation]);

  if (!userLocation) {
    return (
      <div className='p-4'>
        {locationError ? (
          <div className="items-center text-center text-red-500">
            <p className="font-semibold">{locationError}</p>
            <p>Se le redirigirá a una ubicación predeterminada...</p>
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-cyan-800 font-semibold">Esperando la ubicación del usuario...</p>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">

      <div className='absolute top-4 left-4 z-10'>
        <ButtonBack onClick={handleRemoveLastPoint} />
      </div>

      <div className='absolute top-4 right-4 z-10'>
        <Radio setProjectType={handleProjectTypeChange} />
      </div>

      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: defaultLocation.longitude,
          latitude: defaultLocation.latitude,
          zoom: 13,
        }}

        attributionControl={false}
        mapStyle={'mapbox://styles/mapbox/satellite-streets-v12'}
        onClick={handleMapClick}
      >
        <NavigationControl
          position="bottom-right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            gap: '10px',
            borderRadius: '15px',
          }}
        />

        {localPoints.map(([lng, lat], index) => (
          <Marker key={index} longitude={lng} latitude={lat} color="blue">
            <TbPointFilled size={20} />
          </Marker>
        ))}

        {projectType === 'Superficie' && polygonData && (
          <Source id="polygon-source" type="geojson" data={polygonData}>
            <Layer
              id="polygon-layer"
              type="fill"
              paint={{
                'fill-color': '#CA3938',
                'fill-opacity': 0.5,
              }}
            />
          </Source>
        )}

        {projectType === 'Carretera' && lineData && (
          <Source id="line-source" type="geojson" data={lineData}>
            <Layer
              id="line-layer"
              type="line"
              paint={{
                'line-color': '#F7700A',
                'line-width': 10,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}

export default NewCoordinates;
