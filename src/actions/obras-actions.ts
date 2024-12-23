/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { query } from '@/lib/db';
import db from "@/lib/database"

export async function getObras() {
  try {
    const result = await db.coordinates.findMany();

    return result.map((obra: any) => ({
      id: obra.id,
      cui: obra.cui,
      name: obra.name,
      resident: obra.resident,
      projectType: obra.projectType,
      points: JSON.parse(obra.points),
      areaOrLength: obra.areaOrLength,
      propietario_id: obra.propietario_id,
    }));
  } catch (error) {
    console.error("Error al obtener las obras:", error);
    return [];
  }
}


export async function getProyectos() {
  try {
    const result = await query(
      `SELECT 
        app.nombre, 
        app."codigo_CUI",
        apa.propietario_id,
        CONCAT(apu.apellido_paterno, ' ', apu.apellido_materno, ' ', apu.nombre) AS nombre_completo
      FROM public."archivoProject_proyecto" app
      INNER JOIN public."archivoProject_archivo" apa 
        ON app.id = apa.nombre_proyecto_id
      INNER JOIN public."archivoProject_usuario" apu 
        ON apa.propietario_id = apu.dni 
      WHERE apu.rol = '2';`,
      []
    );

    // Recuperar los proyectos existentes en coordinates
    const coordinates = await db.coordinates.findMany({
      select: {
        cui: true, // Solo recuperar el campo "cui"
      },
    });

    // Extraer los códigos CUI existentes en coordinates
    const existingCuis = new Set(coordinates.map((coordinate:any) => coordinate.cui));

    // Filtrar los proyectos que no están en coordinates
    const missingProjects = result.filter((project:any) => !existingCuis.has(project.codigo_CUI));

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
  areaOrLength: string,
  propietario_id: string
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
        propietario_id,
      },
    });

    await db.notification.create({
      data: {
        title: "Registro de nueva " + (projectType === "Superficie"? "Construcción":"Carretera") ,
        description: name,
        status: "actualizado",
        priority: "media",
      }
    });

    // Retornar éxito
    return { message: "La obra y las coordenadas se guardaron con éxito", status: 200 };
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
    // Manejo de errores en la base de datos
    return { message: `Error al guardar`, status: 500 };
  }
}

