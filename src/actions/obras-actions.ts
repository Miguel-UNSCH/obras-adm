"use server";

import { query } from '@/lib/db';

interface Option {
  value: string;
  label: string;
}

export async function getDoc() {
    try {
      const result = await query(
        `SELECT id, tipo_proyecto, abreviatura, nombre, numero_meta, "codigo_CUI", "codigo_OAD", estado_registro, fecha_registro, fecha_modificacion, usuario_registra_id, direccion, latitud, longitud
        FROM public."archivoProject_proyecto"
        WHERE  tipo_proyecto = 'OAD'`,
        []
      );
      return result;
    } catch (error) {
      console.error("Error al obtener los documentos del profesional: ", error);
      return [];
    }
  }