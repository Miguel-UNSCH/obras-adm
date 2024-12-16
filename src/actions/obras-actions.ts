"use server";

import { query } from '@/lib/db';
import db from "@/lib/database"
import { number } from 'zod';

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

    // const result = await query(
    //   `SELECT 
    //     app.nombre, 
    //     app."codigo_CUI", 
    //     CONCAT(apu.apellido_paterno, ' ', apu.apellido_materno, ' ', apu.nombre) AS nombre_completo
    //   FROM public."archivoProject_proyecto" app
    //   INNER JOIN public."archivoProject_archivo" apa 
    //     ON app.id = apa.nombre_proyecto_id
    //   INNER JOIN public."archivoProject_usuario" apu 
    //     ON apa.propietario_id = apu.dni 
    //   WHERE apu.rol = '2';`,
    //   []
    // );

    const prueba = [
      {
        nombre: "MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS DEL SANTUARIO DE LA MEMORIA LA HOYADA EN EL DISTRITO DE ANDRES AVELINO CACERES - PROVINCIA DE HUAMANGA - DEPARTAMENTO DE AYACUCHO",
        codigo_CUI: "2449300",
        nombre_completo: "Pariona Crisante Silvio"
      },
      {
        nombre: "REEMPLAZO DE LA INFRAESTRUCTURA E IMPLEMENTACION DEL CENTRO DE SALUD SAN JUAN BAUTISTA -MICRORED SAN JUAN BAUTISTA DE LA RED DE SALUD HUAMANGA DIRESA-AYACUCHO (ADICIONAL 6)",
        codigo_CUI: "2078579",
        nombre_completo: "Calderón Zevallos Marco Raúl"
      },
      {
        nombre: "CREACIÓN DE CAMNINO VECINAL ENTRE LAS COMUNIDADES DE SAN JOSE-SILLACCASA Y YANTA YANTA EN EL DISTRITO DE SANTA ROSA, PROVINCIA DE LA MAR -AYACUCHO",
        codigo_CUI: "2254348",
        nombre_completo: "Oré Villanueva Marco Antonio"
      }
    ];

    // Recuperar los proyectos existentes en coordinates
    const coordinates = await db.coordinates.findMany({
      select: {
        cui: true, // Solo recuperar el campo "cui"
      },
    });

    // Extraer los códigos CUI existentes en coordinates
    const existingCuis = new Set(coordinates.map(coordinate => coordinate.cui));

    // Filtrar los proyectos que no están en coordinates
    const missingProjects = prueba.filter(project => !existingCuis.has(project.codigo_CUI));

    return missingProjects;

  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return [];
  }
}

export async function guardarObra(
  resident: string,
  projectType: string,
  cui: string,
  name: string,
  points: number[][],
  areaOrLength: string
) {
  try {
    // Guardar en la base de datos
    await db.coordinates.create({
      data: {
        resident,
        projectType,
        cui,
        name,
        areaOrLength,
        points: JSON.stringify(points), // Asegurarse de que 'points' sea un arreglo válido
      },
    });

    // Retornar éxito
    return { message: "La obra y las coordenadas se guardaron con éxito", status: 200 };
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
    // Manejo de errores en la base de datos
    return { message: `Error al guardar`, status: 500 };
  }
}

