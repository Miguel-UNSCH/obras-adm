"use client";

import { useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import LocationObras from './location-works';

interface Obras {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
  coordinates: number[][];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const obra0 = {
  tipo_proyecto: 'OAD',
  nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
  codigo_CUI: '2398491',
  propietario_id: '42062279',
  nombre_completo: 'Fernandez Jeri Carlos',
  coordinates: [
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
};

const obra1 = {
  tipo_proyecto: 'OC',
  nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
  codigo_CUI: '2308421',
  propietario_id: '43962289',
  nombre_completo: 'Aldahir Kenedin Ubilluz',
  coordinates: [
    [-74.206840, -13.162083],
    [-74.205835, -13.159642],
    [-74.201010, -13.160051],
    [-74.201484, -13.161868],
    [-74.203057, -13.162084],
  ],
};

const obra2 = {
  tipo_proyecto: 'SA',
  nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
  codigo_CUI: '2318421',
  propietario_id: '43962789',
  nombre_completo: 'Aldahir Kenedin Ubilluz',
  coordinates: [
    [-74.227160657484, -13.158315560785368],
    [-74.22763671949019, -13.160544218402535],
    [-74.22532964976827, -13.161150409767146],
    [-74.2247437272994, -13.158903928365334]
  ],
};

const obraT = [obra0, obra1, obra2]

function CustomMap() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error obteniendo la ubicación', error);
      }
    );
  }, []);

  if (!isClient || !userLocation) {
    return null;
  }

  return (
    <Map
      initialViewState={{
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        zoom: 13,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=qHY98vxGerd5lTUUPwyF"
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
      {obraT.map((obra, index) => (
        <LocationObras key={index} obra={obra} />
      ))}
    </Map>
  );
}

export default CustomMap;
