'use client';
import { useParams } from 'next/navigation';
import DetallesContainer from './detalles-container';
import ImagesContainer from './images-container';
import { getDetalles } from '@/actions/details-action';
import { getImg, getTime } from '@/actions/img-actions';
import { useEffect, useState } from 'react';

interface Obra {
  id: string;
  cui: string;
  name: string;
  points: number[][];
  areaOrLength: string | null;
  resident: string;
  projectType: string;
}

interface Imgs {
  id: string;
  url: string | null;
  latitud: string | null;
  longitud: string | null;
  date: Date | null;
}

interface Days {
  day: string;
}

function Page() {
  const { id } = useParams();
  const [obra, setObra] = useState<Obra | null>(null);
  const [img, setImg] = useState<Imgs[] | null>(null);
  const [day, setDay] = useState<Days[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id && typeof id === 'string') {
        const data = await getDetalles(id);
        setObra(data);

        const imgs = await getImg();
        setImg(imgs);

        const days = await getTime();
        const formattedDays = days ? days.map(d => ({ day: d.dia })) : null;
        setDay(formattedDays);
      }
    };

    fetchData();
  }, [id]);

  console.log(day);

  if (!obra) return <div>Cargando...</div>;

  return (
    <div className="h-full grid grid-cols-2 gap-4">
      <div className="h-full">
        <ImagesContainer imgs={img} />
      </div>
      <div className="h-full">
        <DetallesContainer obra={obra} />
      </div>
    </div>
  );
}

export default Page;
