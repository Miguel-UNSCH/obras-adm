/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/db.ts
import { Pool, QueryResultRow } from 'pg';

// Define una interfaz para los parámetros de conexión
interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

// Obtiene la configuración desde las variables de entorno
const dbConfig: DBConfig = {
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'mi_base_de_datos',
  user: process.env.PGUSER || 'mi_usuario',
  password: process.env.PGPASSWORD || 'mi_contraseña',
};

// Crea un pool de conexiones con `native: false`
const pool = new Pool(dbConfig);

export async function query<T extends QueryResultRow>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const res = await pool.query<T>(text, params);
  return res.rows;
}