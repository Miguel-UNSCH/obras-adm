'use client';
import { useParams } from 'next/navigation';  
import DetallesContainer from './detalles-container';
import { getDetalles } from '@/actions/details-action';
import { useEffect, useState } from 'react';

interface Obra {
  tipo_proyecto: string;
  nombre: string;
  codigo_CUI: string;
  propietario_id: string;
  nombre_completo: string;
  coordinates: number[][]; 
}

function Page() {
  const { id } = useParams(); 
  const [obra, setObra] = useState<Obra | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id && typeof id === 'string') {
        const data = await getDetalles(id);
        setObra(data);
      }
    };

    fetchData();
  }, [id]);

  if (!obra) return <div>Cargando...</div>;

  return (
    <div>
      <DetallesContainer obra={obra} />
    </div>
  );
}

export default Page;
