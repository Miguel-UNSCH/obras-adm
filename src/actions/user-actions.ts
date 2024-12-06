/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import db from "@/lib/database";
import { updateUserSchema, userSchema } from "@/utils/zod/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { formatDateTime } from "@/lib/format-date";

// Función para actualizar la contraseña del usuario
export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 400 };
    }

    // Verificar que el usuario autenticado está actualizando sus propios datos
    if (data.id !== session.user.id) {
      return { message: "No tienes permiso para actualizar este usuario", status: 400 };
    }

    // Comprobar si las nuevas contraseñas coinciden
    if (data.newPassword !== data.confirmNewPassword) {
      return { message: "Las contraseñas no coinciden", status: 400, field: 2 };
    }

    // Obtener la información del usuario actual para verificar la contraseña
    const user = await db.user.findUnique({
      where: { id: data.id },
    });

    if (!user || !user.password) {
      return { message: "Usuario no encontrado o sin contraseña establecida", status: 400 };
    }

    // Verificar si la contraseña actual es correcta
    const isCurrentPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isCurrentPasswordValid) {
      return { message: "Contraseña incorrecta", status: 400, field: 1 };
    }

    // Encriptar la nueva contraseña antes de guardarla
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 12);

    // Actualizar solo la contraseña en la base de datos
    await db.user.update({
      where: { id: data.id },
      data: { password: hashedNewPassword },
    });

    return { message: "Datos actualizados con éxito", status: 200 };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.errors.map(e => e.message).join(", "), status: 400 };
    }
    return { message: "Error al actualizar el usuario: " + error, status: 500 };
  }
}

export async function getUsers(){
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const users = await db.user.findMany({});

    // Formatear los datos antes de devolver la respuesta
    const formattedData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      user: user.user,
      createdAt: formatDateTime(user.createdAt),  // Formatear la fecha de creación
      updatedAt: formatDateTime(user.updatedAt),  // Formatear la fecha de actualización
    }));

    return formattedData
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}