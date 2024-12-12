"use server";

import { query } from '@/lib/db';

export async function getObras() {
  try {
    const result = await query(
      `SELECT 
        app.tipo_proyecto, 
        app.nombre, 
        app."codigo_CUI", 
        apa.propietario_id, 
        CONCAT(apu.apellido_paterno, ' ', apu.apellido_materno, ' ', apu.nombre) AS nombre_completo
      FROM public."archivoProject_proyecto" app
      INNER JOIN public."archivoProject_archivo" apa 
        ON app.id = apa.nombre_proyecto_id
      INNER JOIN public."archivoProject_usuario" apu 
        ON apa.propietario_id = apu.dni 
      WHERE apu.rol = '2';
      `,
      []
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return [];
  }
}

export async function getProyectos() {
  try {
    const result = await query(
      `SELECT
        app.nombre,
        app."codigo_CUI"
      FROM public."archivoProject_proyecto" app
      INNER JOIN public."archivoProject_archivo" apa
        ON app.id = apa.nombre_proyecto_id
      INNER JOIN public."archivoProject_usuario" apu 
        ON apa.propietario_id = apu.dni 
      WHERE apu.rol = '2';
      `,
      []
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return [];
  }
}

export async function guardarObra(selectedOption: string) {

  try {
    console.log('Cargo guardado con éxito');
    return { success: true, message: 'Cargo guardado con éxito' };

  } catch (error) {
    console.error('Error al guardar el cargo:', error);
    return { success: false, message: 'Error al guardar el cargo', error };
  }
  
}