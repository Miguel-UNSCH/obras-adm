import { z } from 'zod';

// ======================= LOGIN ESQUEMA ==================

export const signInSchema = z.object({
  username: z.string({ required_error: "Ingrese un usuario" })
    .min(1, "El usuario es necesario"),
  password: z.string({ required_error: "La contraseña es necesaria" })
    .min(1, "La contraseña es necesaria")
})