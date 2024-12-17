"use server";

import db from "@/lib/database";

export async function getNotification() {
    try {
        const result = await db.notification.findMany();

        const resultados = result.map((resul) => ({
            id: resul.id,
            title: resul.title,
            description: resul.description,
            status: resul.status,
            priority: resul.priority,
            update: new Date(resul.updatedAt).toLocaleString(),
        }));

        return resultados;
    } catch (error) {
        console.error("Error al obtener las obras: ", error);
        return null;
    }
}