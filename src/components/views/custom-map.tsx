"use client";

import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl } from 'react-map-gl';
import LocationObras from './location-works';
import Loader from './wait-custom';

interface Obras {
  id: string;
  cui: string;
  name: string;
  points: number[][];
  areaOrLength: string | null;
  resident: string;
  projectType: string;
  propietario_id: string;
}

type obrasProsp = {
  obrasT: Obras[];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

function CustomMap({ obrasT }: obrasProsp) {

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [defaultLocation] = useState<UserLocation>({ latitude: -13.160441, longitude: -74.225832 });

  const requestLocation = () => {
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
        if (error.code === 1) {
          setLocationError('El usuario denegó el permiso de geolocalización');
        } else if (error.code === 2) {
          setLocationError('La posición geográfica no está disponible');
        } else if (error.code === 3) {
          setLocationError('La solicitud de geolocalización ha superado el tiempo de espera');
        }
      },
      { timeout: 2000 }
    );
  };

  useEffect(() => {
    setIsClient(true);

    const timeoutId = setTimeout(() => {
      if (!userLocation) {
        setUserLocation(defaultLocation);
      }
    }, 2500);

    requestLocation();

    return () => clearTimeout(timeoutId);
  }, [userLocation]);

  if (!isClient || !userLocation) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-10">
        {locationError ? (
          <div className="items-center text-center text-red-500">
            <p className="font-semibold">{locationError}</p>
            <p>Se le redirigirá a una ubicación predeterminada...</p>
            <Loader />
          </div>
        ) : (
          <div className="text-center text-gray-700 dark:text-stone-400">
            <p className="font-semibold">Esperando la ubicación del usuario...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        longitude: userLocation ? userLocation.longitude : defaultLocation.longitude,
        latitude: userLocation ? userLocation.latitude : defaultLocation.latitude,
        zoom: 13,
      }}
      attributionControl={false}
      mapStyle={'mapbox://styles/mapbox/standard'}
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
      {obrasT.map((obra, index) => (
        <LocationObras key={index} obra={obra} />
      ))}
    </Map>
  );
}

export default CustomMap;
