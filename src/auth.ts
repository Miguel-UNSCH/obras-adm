import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/lib/database";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Tiempo de expiracón 24 horas
    updateAge: 8 * 60 * 60, // Actualiza el tiempo de expiración cada 8 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Verificar que user.id no sea undefined
        if (user.id) {
          token.id = user.id;  // Asignar solo si user.id es un string
        }
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Incluye el ID en la sesión
      session.user.user = token.user; //
      return session;
    },
    authorized: async ({auth}) => {
      return !!auth
    }
  },
  pages: {
    signIn: "/login",
  },
});