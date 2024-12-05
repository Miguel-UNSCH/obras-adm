"use client";

import { useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import { Feature, Polygon } from 'geojson';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button } from '../ui/button';

function CustomMap() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const polygonData: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
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
      ],
    },
  };

  const polygonData1: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.206840, -13.162083],
          [-74.205835, -13.159642],
          [-74.201010, -13.160051],
          [-74.201484, -13.161868],
          [-74.203057, -13.162084],
        ],
      ],
    },
  };

  const polygonLayer1 = {
    id: 'polygon-layer-1',
    type: 'fill',
    paint: {
      'fill-color': '#088ff5',
      'fill-opacity': 0.3,
    },
  } as const;

  const polygonLayer2 = {
    id: 'polygon-layer-2',
    type: 'fill',
    paint: {
      'fill-color': '#ff6347',
      'fill-opacity': 0.3,
    },
  } as const;

  const handleMarkerClick = () => {
    setIsActive(true)
  };


  return (
    <Map
      initialViewState={{
        longitude: -74.213586,
        latitude: -13.166720,
        zoom: 13,
      }}
      attributionControl={false}
      mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=qHY98vxGerd5lTUUPwyF"
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

      <Marker
        longitude={-74.220767}
        latitude={-13.146605}
        onClick={handleMarkerClick}
      >
        <FaMapMarkerAlt className='text-[#FF0000] text-4xl'/>
        <div className={`absolute top-0 left-0 ${isActive? 'block': 'hidden'}`}>
          <p>TITULO: OBRAS N1</p>
          <br />
          <Button>Detalles</Button>
        </div>
      </Marker>


      <Marker
        longitude={-74.204258}
        latitude={-13.160892}
        onClick={handleMarkerClick}
      >
        <FaMapMarkerAlt className='text-[#FF0000] text-4xl'/>
        <div className={`absolute top-0 left-0 ${isActive? 'block': 'hidden'}`}>
          <p>TITULO: OBRAS N2</p>
          <br />
          <Button>Detalles</Button>
        </div>
      </Marker>

      <Source id="polygon-source" type="geojson" data={polygonData}>
        <Layer {...polygonLayer1} />
      </Source>

      <Source id="polygon-source1" type="geojson" data={polygonData1}>
        <Layer {...polygonLayer2} />
      </Source>
    </Map>
  );
}

export default CustomMap;
