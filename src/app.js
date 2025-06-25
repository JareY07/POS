import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import cuentaRoutes from "./routes/cuenta.routes.js";

const app = express();

// Configuración básica de CORS (permite todos los orígenes)
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Middlewares básicos
app.use(express.json());

// Usar rutas
app.use("/api/productos", productoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cuentas", cuentaRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`POS API corriendo en http://localhost:${PORT}`);
});

export default app;
