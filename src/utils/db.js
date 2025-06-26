import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Validar variables críticas
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(`Missing environment variables: ${missingVars.join(", ")}`);
}

// Crear pool de conexiones con configuraciones mejoradas
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
});

export default pool;
