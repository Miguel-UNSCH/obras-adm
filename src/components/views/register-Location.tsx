import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { useState, useCallback, useEffect } from 'react';
import { Feature, Polygon } from 'geojson';
import { TbPointFilled } from "react-icons/tb";
import ButtonBack from '@/components/ui/icons-back';
import Radio from './option-figura';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface NewCoordinatesProps {
  points: [number, number][];
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>;
}

function

  NewCoordinates({ points, setPoints }: NewCoordinatesProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [polygonData, setPolygonData] = useState<Feature<Polygon> | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [geoPermissionDenied, setGeoPermissionDenied] = useState(false);
  const [defaultLocation] = useState<UserLocation>({ latitude: -13.160441, longitude: -74.225832 });

  const [localPoints, setLocalPoints] = useState<[number, number][]>(points);

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setLocalPoints((prevPoints) => {
      const newPoints: [number, number][] = [...prevPoints, [lng, lat]];
      if (newPoints.length >= 3) {
        setPolygonData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [newPoints.concat([newPoints[0]])],
          },
          properties: {},
        });
      }
      return newPoints;
    });
  }, []);

  useEffect(() => {
    setPoints(localPoints);
  }, [localPoints, setPoints]);

  const polygonLayer = {
    id: 'polygon-layer',
    type: 'fill' as const,
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.3,
    },
  };

  const handleButtonClick = () => {
    setLocalPoints((prevPoints) => {
      const updatedPoints = prevPoints.slice(0, -1);
      if (updatedPoints.length >= 3) {
        setPolygonData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [updatedPoints.concat([updatedPoints[0]])],
          },
          properties: {},
        });
      } else {
        setPolygonData(null);
      }
      return updatedPoints;
    });
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
            setGeoPermissionDenied(true);
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
      { timeout: 5000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();

    const timeoutId = setTimeout(() => {
      if (!userLocation) {
        setUserLocation(defaultLocation);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [userLocation, requestLocation]);

  const retryLocationRequest = () => {
    setGeoPermissionDenied(false);
    setLocationError(null);
    requestLocation();
  };

  if (!userLocation) {
    return (
      <div className='p-4'>
        {locationError ? (
          <div>
            <p>{locationError}</p>
            {geoPermissionDenied && (
              <button onClick={retryLocationRequest} className="text-blue-600">Intentar de nuevo</button>
            )}
          </div>
        ) : (
          <p>Esperando la ubicación del usuario...</p>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className='absolute top-4 left-4 z-10'>
        <ButtonBack onClick={handleButtonClick} />
      </div>
      <div className='absolute top-4 right-4 z-10'>
        <Radio />
      </div>

      <Map
        initialViewState={{
          longitude: defaultLocation.longitude,
          latitude: defaultLocation.latitude,
          zoom: 13,
        }}
        attributionControl={false}
        mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=qHY98vxGerd5lTUUPwyF"
        onClick={handleMapClick}
        style={{ width: '100%', height: '100%' }}
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
        {localPoints.map((point, index) => (
          <Marker key={index} longitude={point[0]} latitude={point[1]} color="blue">
            <TbPointFilled size={20} />
          </Marker>
        ))}
        {polygonData && (
          <Source id="polygon-source" type="geojson" data={polygonData}>
            <Layer {...polygonLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}

export default NewCoordinates;
