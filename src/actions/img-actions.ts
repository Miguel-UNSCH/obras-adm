"use server";

import db from "@/lib/database";

export async function getImg() {
    try {
        const result = await db.image.findMany();

        const obras = result.map((result) => ({
            id: result.id,
            url: result.url,
            latitud: result.latitud,
            longitud: result.longitud,
            date: result.date,
        }));

        return obras;
    } catch (error) {
        console.error("Error al obtener las obras: ", error);
        return null;
    }
}

export async function getTime() {
    try {
        const result = await db.image.findMany();

        const obras = result.map((result) => ({
            dia: new Date(result.updatedAt).toISOString().split("T")[0]
        }));

        return obras;
    } catch (error) {
        console.error("Error al obtener las obras: ", error);
        return null;
    }
}
