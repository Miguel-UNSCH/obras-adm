"use client";

import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { useState, useCallback, useEffect } from 'react';
import { Feature, Polygon } from 'geojson';
import { TbPointFilled } from "react-icons/tb";
import ButtonSave from '@/components/ui/icons-save';
import ButtonBack from '@/components/ui/icons-back';

interface UserLocation {
  latitude: number;
  longitude: number;
}

function NewCoordinates() {

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [polygonData, setPolygonData] = useState<Feature<Polygon> | null>(null);

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, [lng, lat] as [number, number]];
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

  const polygonLayer = {
    id: 'polygon-layer',
    type: 'fill',
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.3,
    },
  } as const;

  const handleButtonClick = () => {
    setPoints((prevPoints) => {
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

  const handleSaveClick = () => {
    console.log(points);
  };

  return (
    <div className="relative w-full h-full">

      <div className='absolute top-4 left-4 z-10'>
        <ButtonBack onClick={handleButtonClick}/>
      </div>

      
      <div className="absolute top-4 right-4 z-10">
        <ButtonSave onClick={handleSaveClick} />
      </div>
      <Map
        initialViewState={{
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
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
        {points.map((point, index) => (
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
