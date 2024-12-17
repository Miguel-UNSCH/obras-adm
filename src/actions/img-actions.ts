"use server";

import db from "@/lib/database";

export async function getDaysWorked(id: string) {
  try {
    // Filtrar las imágenes por propietario_id y la fecha asignada
    const resultados = await db.image.findMany({
      where: {
        propietario_id: id,
      },
    });

    const diasTrabajados = resultados.map((resul) => ({
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
    }));

    return diasTrabajados;
  } catch (error) {
    console.error("Error al obtener las obras: ", error);
    return null;
  }
}
