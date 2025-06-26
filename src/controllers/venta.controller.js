import Venta from "../models/venta.model.js";
import DetalleVenta from "../models/detalleVenta.model.js";
import Producto from "../models/producto.model.js";
import pool from "../utils/db.js";

export const crearVenta = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    console.log("Usuario en request:", req.user); // ← Debug

    if (!req.user?.id) {
      throw new Error("Usuario no autenticado correctamente");
    }

    console.log("Datos recibidos:", req.body); // ← Para debug
    const { clienteId, productos } = req.body;

    // Validación manual adicional
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      throw new Error("Lista de productos inválida");
    }

    // Verificar existencia de cliente (si se proporciona)
    if (clienteId) {
      const [cliente] = await connection.query(
        "SELECT id FROM cliente WHERE id = ? AND activo = 1",
        [clienteId]
      );
      if (!cliente[0]) throw new Error("Cliente no existe");
    }

    // Procesar productos
    let total = 0;
    const productosVerificados = [];

    for (const item of productos) {
      // Validar estructura del producto
      if (!item.productoId || !item.cantidad || !item.precioUnitario) {
        throw new Error("Producto mal formado");
      }

      // Verificar producto en BD
      const [producto] = await connection.query(
        "SELECT id, existencia, precioUnitario FROM producto WHERE id = ? AND activo = 1",
        [item.productoId]
      );

      if (!producto[0]) {
        throw new Error(`Producto ${item.productoId} no encontrado`);
      }

      // Validar stock
      if (producto[0].existencia < item.cantidad) {
        throw new Error(`Stock insuficiente para producto ${item.productoId}`);
      }

      // Validar precio (opcional)
      if (Math.abs(producto[0].precioUnitario - item.precioUnitario) > 0.01) {
        console.warn("Advertencia: Precio diferente al registrado");
      }

      total += item.precioUnitario * item.cantidad;
      productosVerificados.push(item);
    }

    // Insertar venta
    const [ventaResult] = await connection.query(
      "INSERT INTO venta (clienteId, total) VALUES (?, ?)",
      [clienteId || null, total]
    );
    const ventaId = ventaResult.insertId;

    // Insertar detalles
    for (const item of productosVerificados) {
      await connection.query(
        "INSERT INTO detalleVenta (VentaId, productoId, cantidad, precioUnitario) VALUES (?, ?, ?, ?)",
        [ventaId, item.productoId, item.cantidad, item.precioUnitario]
      );

      // Actualizar stock
      await connection.query(
        "UPDATE producto SET existencia = existencia - ? WHERE id = ?",
        [item.cantidad, item.productoId]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      ventaId,
      total,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error en venta:", error.message);

    res.status(500).json({
      success: false,
      error: "Error al registrar venta",
      details: process.env.NODE_ENV !== "production" ? error.message : null,
      stack: process.env.NODE_ENV !== "production" ? error.stack : null,
    });
  } finally {
    connection.release();
  }
};

export const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.getAll();
    res.json({ success: true, data: ventas });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al obtener ventas" });
  }
};
