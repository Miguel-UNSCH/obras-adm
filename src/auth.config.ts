import db from "@/lib/database";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "./utils/zod/schemas";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = signInSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid username or password format");
        }

        // Verificar si existe el usuario en la base de datos
        const user = await db.user.findFirst({
          where: {
            OR: [{ user: data.username }, { email: data.username.toLowerCase() }],
          },
        });

        if (!user || !user.password) {
          throw new Error("Credenciales incorectas");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Credenciales incorectas");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          user: user.user,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;