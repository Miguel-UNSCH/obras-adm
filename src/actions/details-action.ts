"use server";

import db from "@/lib/database";

export async function getDetalles(id: string) {
  try {
    const result = await db.coordinates.findMany();

    // Buscar la obra con el CUI proporcionado
    const obraEncontrada = result.find((obra) => obra.cui === id);

    // Si no se encuentra la obra, devolver null
    if (!obraEncontrada) {
      return null;
    }

    // Formatear los datos de la obra encontrada
    const formattedObra = {
      id: obraEncontrada.id,
      cui: obraEncontrada.cui,
      name: obraEncontrada.name,
      points: JSON.parse(obraEncontrada.points), // Asegurarse de que los puntos estén parseados
      areaOrLength: obraEncontrada.areaOrLength,
      resident: obraEncontrada.resident,
      projectType: obraEncontrada.projectType,
    };

    return formattedObra;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return null;
  }
}
