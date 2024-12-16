"use server";

import db from "@/lib/database";

export async function getImg(id: string, day: string) {
  try {
    // Filtrar las imágenes por propietario_id
    const result = await db.image.findMany({
      where: {
        propietario_id: id,  // Filtrar por propietario_id
      },
    });

    // Mapear los resultados para incluir propietario_id y otras propiedades
    const obras = result.map((resul) => ({
      id: resul.id,
      url: resul.url,
      latitud: resul.latitud,
      longitud: resul.longitud,
      date: resul.date,
      update: (() => {
        const updatedAt = new Date(resul.updatedAt); // Convertir a objeto Date
        updatedAt.setUTCHours(0, 0, 0, 0); // Ajustar la hora a medianoche en UTC
        return updatedAt.toISOString().split("T")[0] + "T00:00"; // Formato "YYYY-MM-DDT00:00"
      })(),
      propietario_id: resul.propietario_id,  // Asegurarse de incluir propietario_id
    }));

    return obras;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return null;
  }
}
