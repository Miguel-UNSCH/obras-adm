import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
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
  points: [number, number][]; // Puntos que se recolectan en el mapa
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>; // Función para actualizar los puntos en el componente padre
  setProjectType: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar el tipo de proyecto en el componente padre
}

function NewCoordinates({ points, setPoints, setProjectType }: NewCoordinatesProps) {
  const [polygonData, setPolygonData] = useState<Feature<Polygon> | null>(null);
  const [lineData, setLineData] = useState<Feature<LineString> | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [geoPermissionDenied, setGeoPermissionDenied] = useState(false);
  const defaultLocation: UserLocation = { latitude: -13.160441, longitude: -74.225832 };
  const [localPoints, setLocalPoints] = useState<[number, number][]>(points);
  const [projectType, setProjectTypeState] = useState<string>("figura");

  // Función para actualizar los datos de la geometría (polígono o línea)
  const updateGeometryData = useCallback((points: [number, number][], projectType: string) => {
    if (projectType === 'figura' && points.length >= 3) {
      setPolygonData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [points.concat([points[0]])], // Cierra el polígono
        },
        properties: {},
      });
      setLineData(null); // Elimina los datos de la línea cuando se cambia a polígono
    } else if (projectType === 'linea' && points.length >= 2) {
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
      if (projectType === 'linea' && newPoints.length >= 2) {
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
      } else if (projectType === 'figura' && newPoints.length >= 3) {
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

  // Actualiza los puntos en el estado externo (para que se mantengan sincronizados)
  useEffect(() => {
    setPoints(localPoints);
  }, [localPoints, setPoints]);

  // Función para eliminar el último punto
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

  // Solicitar la ubicación del usuario
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

  // Solicitar la ubicación al cargar el componente
  useEffect(() => {
    requestLocation();

    const timeoutId = setTimeout(() => {
      if (!userLocation) {
        setUserLocation(defaultLocation);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [userLocation, requestLocation, defaultLocation]);

  // Función para intentar obtener la ubicación nuevamente si el permiso fue denegado
  const retryLocationRequest = () => {
    setGeoPermissionDenied(false);
    setLocationError(null);
    requestLocation();
  };

  // Si no se tiene la ubicación, mostrar un mensaje de espera o error
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
      {/* Botón para eliminar el último punto */}
      <div className='absolute top-4 left-4 z-10'>
        <ButtonBack onClick={handleRemoveLastPoint} />
      </div>

      {/* Componente para seleccionar tipo de figura */}
      <div className='absolute top-4 right-4 z-10'>
        <Radio setProjectType={handleProjectTypeChange} />
      </div>

      {/* Mapa */}
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
        <NavigationControl position="bottom-right" />

        {/* Marcadores para los puntos */}
        {localPoints.map(([lng, lat], index) => (
          <Marker key={index} longitude={lng} latitude={lat} color="blue">
            <TbPointFilled size={20} />
          </Marker>
        ))}

        {/* Capa para mostrar el polígono */}
        {projectType === 'figura' && polygonData && (
          <Source id="polygon-source" type="geojson" data={polygonData}>
            <Layer
              id="polygon-layer"
              type="fill"
              paint={{
                'fill-color': '#E28F1B',
                'fill-opacity': 0.5,
              }}
            />
          </Source>
        )}

        {/* Capa para mostrar la línea */}
        {projectType === 'linea' && lineData && (
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
