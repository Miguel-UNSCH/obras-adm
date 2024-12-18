'use client';
import { useParams } from 'next/navigation';
import DetallesContainer from './detalles-container';
import ImagesContainer from './images-container';
import { getDetalles } from '@/actions/details-action';
import { getDaysWorked } from '@/actions/img-actions';
import { useEffect, useState } from 'react';
import Loader from '@/components/views/wait-custom';

interface Obra {
  id: string;
  cui: string;
  name: string;
  points: number[][];
  areaOrLength: string | null;
  resident: string;
  projectType: string;
  propietario_id: string;
}

interface Imgs {
  id: string;
  url: string | null;
  latitud: string | null;
  longitud: string | null;
  date: Date | null;
  update: string | null;
}

function Page() {
  const { id } = useParams();
  const [obra, setObra] = useState<Obra | null>(null);
  const [img, setImg] = useState<Imgs[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id && typeof id === 'string') {
        const data = await getDetalles(id);
        setObra(data);

        if (data && data.propietario_id) {
          const imgs = await getDaysWorked(data.propietario_id);
          setImg(imgs);
        }
      }
    };

    fetchData();
  }, [id]);


  if (!obra) return <div className='text-center text-cyan-900 dark:text-teal-400 font-semibold'>
    Cargando...
  </div>;

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
