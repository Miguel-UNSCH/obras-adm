import { PrismaClient } from "@prisma/client";

// Definimos una función que retorna una instancia de PrismaClient
const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

// Accedemos al objeto global con un casteo adecuado
const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };

// Si ya existe una instancia de prisma en el global, úsala; si no, crea una nueva
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Exportamos la instancia de prisma
export default prisma;

// En desarrollo, almacenamos prisma en el objeto global para evitar múltiples instancias
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;