import { z } from 'zod';

// ======================= LOGIN ESQUEMA ==================

export const signInSchema = z.object({
  username: z.string({ required_error: "Ingrese un usuario" })
    .min(1, "El usuario es necesario"),
  password: z.string({ required_error: "La contraseña es necesaria" })
    .min(1, "La contraseña es necesaria")
})

// ======================= USUARIOS ESQUEMAS ==================

export const userSchema = z.object({
  name: z.string({ required_error: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }).optional(),
  image: z.string().url({ message: "Debe ser una URL válida" }).optional().nullable(),
  user: z.string({ required_error: "El usuario es obligatorio" }),
  password: z.string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseñ debe tener al menos 8 caracteres"),
  roleId: z.string({required_error: "El campo rol es obligatorio"}).min(1, {
    message: 'El campo "ID de rol" es obligatorio.',
  }),
  
  // Relaciones opcionales
  accounts: z.array(z.object({})).optional(),  // Relación con Account (definir esquema si es necesario)
  sessions: z.array(z.object({})).optional(),  // Relación con Session
  role: z.object({}).optional().nullable(),  // Relación opcional con Role
  
  personaNaturals: z.array(z.object({})).optional(),  // Relación con PersonaNatural
  personaJuridicas: z.array(z.object({})).optional(),  // Relación con PersonaJuridica
  productos: z.array(z.object({})).optional(),  // Relación con Producto
});

// Esquema para actualizar el usuario
export const updateUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }).optional(),
  user: z.string({ required_error: "El nombre de usuario es obligatorio" }),
  password: z.string({ required_error: "Campo obligatorio" })
    .min(1, "Campo obligatorio"),
  newPassword: z.string({ required_error: "Campo obligatorio" })
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
  confirmNewPassword: z.string({ required_error: "Campo obligatorio" })
}).refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {
  message: "La nueva contraseña y la confirmación no coinciden",
  path: ["confirmNewPassword"],
});