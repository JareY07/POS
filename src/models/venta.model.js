import pool from "../utils/db.js";

class Venta {
  static async create(clienteId, total, usuarioId) {
    const [result] = await pool.query(
      "INSERT INTO venta (clienteId, total, usuarioId) VALUES (?, ?, ?)",
      [clienteId, total, usuarioId]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query(`
      SELECT v.*, c.nombre AS clienteNombre 
      FROM venta v
      LEFT JOIN cliente c ON v.clienteId = c.id
      WHERE v.activo = 1
    `);
    return rows;
  }
}

export default Venta;
