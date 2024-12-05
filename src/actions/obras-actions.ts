"use server";

import { query } from '@/lib/db';

export async function getObras() {
  try {
    const result = await query(
      `SELECT id, tipo_proyecto, abreviatura, nombre, "codigo_CUI"
        FROM public."archivoProject_proyecto"`,
      []
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return [];
  }
}