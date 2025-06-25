import pool from "../utils/db.js";

class DetalleVenta {
  static async create(ventaId, productoId, cantidad, precioUnitario) {
    await pool.query(
      "INSERT INTO detalleVenta (ventaId, productoId, cantidad, precioUnitario) VALUES (?, ?, ?, ?)",
      [ventaId, productoId, cantidad, precioUnitario]
    );
  }

  static async getByVentaId(ventaId) {
    const [rows] = await pool.query(
      `
      SELECT dv.*, p.nombreProducto 
      FROM detalleVenta dv
      JOIN producto p ON dv.productoId = p.id
      WHERE dv.ventaId = ?
    `,
      [ventaId]
    );
    return rows;
  }
}

export default DetalleVenta;
