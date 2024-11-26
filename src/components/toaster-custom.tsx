'use client'

import { toast } from "sonner";

export default function toasterCustom(status: number, message?: string, duration?: number) {
  if (status === 0) {
    toast.loading('Cargando', {
      description: <span className="text-cyan-400">{message ? message : 'Guardando en la base de datos'}</span>,
    });
  } else if (status === 200) {
    toast.success('Correcto', {
      description: <span className="text-green-400">{message}</span>,
      duration: duration || 2000,
    });
  } else if (status === 400) {
    toast.warning('Advertencia', {
      description: <span className="text-orange-400">{message}</span>,
      duration: duration || 2000,
    });
  } else if (status === 500) {
    toast.error('Error', {
      description: <span className="text-red-400">{message}</span>,
      duration: duration || 2000,
    });
  } else {
    toast.info('Información', {
      description: <span className="text-blue-400">{message}</span>,
      duration: duration || 2000,
    });
  }
}